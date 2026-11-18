import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { readDb, writeDb, Lead, Booking, Review, MaintenanceSubscriber } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

// ----------------------------------------------------
// Health Check
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Appy Roofing Co. Core Backend API',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Statistics & CRM Pipeline Metrics
// ----------------------------------------------------
app.get('/api/stats', (req, res) => {
  const db = readDb();
  const totalLeads = db.leads.length;
  const newInquiries = db.leads.filter(l => l.status === 'New').length;
  const scheduledInspections = db.leads.filter(l => l.status === 'Inspection Scheduled').length;
  const approvedEstimates = db.leads.filter(l => l.status === 'Approved').length;
  const completedProjects = db.projects.filter(p => p.status === 'Completed & Warranted').length + 840; // demo verified baseline
  const totalPipelineValue = db.leads.reduce((sum, l) => sum + (l.estimatedValue || 12000), 0);

  res.json({
    totalLeads,
    newInquiries,
    scheduledInspections,
    approvedEstimates,
    completedProjects,
    totalPipelineValue,
    satisfactionRate: 99.4,
    yearsInBusiness: 18,
    activeCrews: 6,
    avgResponseMinutes: 14
  });
});

// ----------------------------------------------------
// Leads API
// ----------------------------------------------------
app.get('/api/leads', (req, res) => {
  const db = readDb();
  const { status, service } = req.query;
  let filtered = [...db.leads];
  if (status && status !== 'all') {
    filtered = filtered.filter(l => l.status.toLowerCase() === String(status).toLowerCase());
  }
  if (service && service !== 'all') {
    filtered = filtered.filter(l => l.serviceRequired.toLowerCase().includes(String(service).toLowerCase()));
  }
  res.json(filtered.reverse());
});

app.post('/api/leads', (req, res) => {
  const db = readDb();
  const {
    fullName,
    phone,
    email,
    propertyAddress,
    zipCode,
    serviceRequired,
    problemDescription,
    preferredDate,
    preferredTime,
    estimatedValue,
    source,
    photos
  } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Full name and phone number are required.' });
  }

  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    fullName,
    phone,
    email: email || '',
    propertyAddress: propertyAddress || '',
    zipCode: zipCode || '',
    serviceRequired: serviceRequired || 'General Roof Inspection',
    problemDescription: problemDescription || 'Online customer inquiry submitted.',
    preferredDate: preferredDate || '',
    preferredTime: preferredTime || '',
    status: 'New',
    assignedTo: 'Dispatch Team',
    internalNotes: `Received via ${source || 'Website Form'}. Follow-up priority standard.`,
    estimatedValue: estimatedValue || 12500,
    createdAt: new Date().toISOString(),
    source: source || 'Website Estimate Form',
    photos: photos || []
  };

  db.leads.unshift(newLead);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Estimate request received successfully. Our project advisor will contact you within 15 minutes during business hours.',
    lead: newLead
  });
});

app.patch('/api/leads/:id', (req, res) => {
  const db = readDb();
  const { id } = req.params;
  const index = db.leads.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Lead not found.' });
  }

  const updated = {
    ...db.leads[index],
    ...req.body
  };

  db.leads[index] = updated;
  writeDb(db);
  res.json({ success: true, lead: updated });
});

// ----------------------------------------------------
// Bookings API
// ----------------------------------------------------
app.get('/api/bookings', (req, res) => {
  const db = readDb();
  res.json(db.bookings);
});

app.post('/api/bookings', (req, res) => {
  const db = readDb();
  const { customerName, phone, email, address, zipCode, service, date, timeSlot, notes } = req.body;

  if (!customerName || !phone || !date || !timeSlot) {
    return res.status(400).json({ error: 'Customer name, phone, date, and time slot are required.' });
  }

  // Double booking check
  const duplicate = db.bookings.find(b => b.date === date && b.timeSlot === timeSlot && b.status === 'Confirmed');
  if (duplicate) {
    return res.status(409).json({
      error: 'This specific time slot has just been reserved. Please select another slot.'
    });
  }

  const newBooking: Booking = {
    id: `bk-${Date.now()}`,
    customerName,
    phone,
    email: email || '',
    address: address || '',
    zipCode: zipCode || '',
    service: service || 'Roof Inspection',
    date,
    timeSlot,
    status: 'Confirmed',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);

  // Also record in leads CRM
  const linkedLead: Lead = {
    id: `lead-bk-${Date.now()}`,
    fullName: customerName,
    phone,
    email: email || '',
    propertyAddress: address || '',
    zipCode: zipCode || '',
    serviceRequired: service || 'Roof Inspection',
    problemDescription: `Direct appointment booked for ${date} at ${timeSlot}. Notes: ${notes || 'None'}`,
    preferredDate: date,
    preferredTime: timeSlot,
    status: 'Inspection Scheduled',
    assignedTo: 'Lead Field Inspector',
    internalNotes: 'Automated booking confirmation dispatched.',
    estimatedValue: 13500,
    createdAt: new Date().toISOString(),
    source: 'Calendar Booking System'
  };
  db.leads.unshift(linkedLead);

  writeDb(db);

  res.status(201).json({
    success: true,
    bookingId: newBooking.id,
    confirmationCode: `APX-BK-${Math.floor(100000 + Math.random() * 900000)}`,
    booking: newBooking
  });
});

// ----------------------------------------------------
// Smart ZIP Code Service Area Checker
// ----------------------------------------------------
const PRIMARY_SERVICE_ZIPS = new Set([
  // Dallas - Fort Worth Corridor
  '75201', '75202', '75204', '75205', '75219', '75225', '75001', '75006', '75024', '75034', '75093', '76092', '76051', '76102', '76107',
  // Austin & Central Texas
  '78701', '78703', '78704', '78746', '78731', '78759', '78613', '78664', '78681',
  // Houston Metro
  '77002', '77005', '77006', '77019', '77024', '77056', '77380', '77381', '77401', '77479',
  // San Antonio & Hill Country
  '78209', '78258', '78230', '78257', '78006', '78015',
  // Nationwide Sample Metros
  '30301', '30309', '80202', '80206', '28202', '85001', '85018', '32801'
]);

app.get('/api/zip-check', (req, res) => {
  const zip = String(req.query.zip || '').trim();
  if (!zip || zip.length < 5) {
    return res.status(400).json({ error: 'Please provide a valid 5-digit US ZIP code.' });
  }

  const isPrimary = PRIMARY_SERVICE_ZIPS.has(zip);
  const zipNum = parseInt(zip, 10);
  // Extended regional coverage: if starts with standard Texas ranges (75xxx, 76xxx, 77xxx, 78xxx) or neighboring
  const isExtended = !isPrimary && (zip.startsWith('75') || zip.startsWith('76') || zip.startsWith('77') || zip.startsWith('78') || zip.startsWith('79') || zip.startsWith('80') || zip.startsWith('30') || zip.startsWith('28'));

  if (isPrimary) {
    return res.json({
      zipCode: zip,
      available: true,
      tier: 'Express Tier 1 Hub',
      message: 'Excellent news! You are located in our immediate full-service coverage zone. Same-day emergency response and priority inspection slots available.',
      estimatedResponseTime: 'Under 2 hours for emergencies / 24 hours for inspection',
      localBranch: 'Appy Central Regional Depot & Fabrication Center',
      freeInspectionEligible: true
    });
  } else if (isExtended) {
    return res.json({
      zipCode: zip,
      available: true,
      tier: 'Regional Service Corridor',
      message: 'Great news! We service your area through our extended regional mobile fleet. Full warranty and inspection scheduling is open.',
      estimatedResponseTime: '24-48 hours',
      localBranch: 'Appy Regional Fleet Dispatch',
      freeInspectionEligible: true
    });
  } else {
    return res.json({
      zipCode: zip,
      available: false,
      tier: 'Out-of-Region / Partner Network',
      message: 'We do not currently have a direct daily crew stationed in this ZIP code, but our certified partner network can assist or we can arrange commercial project accommodations.',
      requestCallbackAvailable: true,
      freeInspectionEligible: false
    });
  }
});

// ----------------------------------------------------
// Cost Estimator API
// ----------------------------------------------------
app.post('/api/estimate', (req, res) => {
  const {
    squareFootage = 2400,
    material = 'Architectural Asphalt Shingles',
    stories = 1,
    pitch = 'Medium (6/12 - 8/12)',
    existingTearOff = true,
    warrantyTier = 'Premium System (50-Yr)',
    zipCode = '75201'
  } = req.body;

  // Roofing squares = sqft / 100
  const squares = Math.ceil(Number(squareFootage) / 100);

  // Material cost per square (installed baseline)
  let materialRate = 420; // asphalt base
  let materialLifespan = '25 - 30 Years';

  switch (material) {
    case 'Architectural Asphalt Shingles':
      materialRate = 430;
      materialLifespan = '25 - 30 Years';
      break;
    case 'Standing Seam Metal Roofing':
      materialRate = 880;
      materialLifespan = '50 - 70+ Years';
      break;
    case 'Spanish Clay Tile':
      materialRate = 1250;
      materialLifespan = '60 - 100 Years';
      break;
    case 'Natural Slate':
      materialRate = 1650;
      materialLifespan = '75 - 150 Years';
      break;
    case 'Commercial TPO Membrane':
      materialRate = 620;
      materialLifespan = '25 - 35 Years';
      break;
    default:
      materialRate = 450;
  }

  // Pitch multiplier
  let pitchMultiplier = 1.0;
  if (pitch.includes('Steep')) pitchMultiplier = 1.25;
  if (pitch.includes('Low')) pitchMultiplier = 0.95;

  // Story multiplier
  const storyMultiplier = Number(stories) === 2 ? 1.15 : Number(stories) >= 3 ? 1.3 : 1.0;

  // Tear-off cost: ~$65 per square
  const tearOffCost = existingTearOff ? squares * 68 : 0;

  // Base materials & labor
  const rawBase = squares * materialRate * pitchMultiplier * storyMultiplier;
  const materialsPortion = Math.round(rawBase * 0.48);
  const laborPortion = Math.round(rawBase * 0.42);
  const ventilationAndPermits = Math.round(squares * 28 + 450);

  const lowEstimate = Math.round(materialsPortion + laborPortion + tearOffCost + ventilationAndPermits);
  const highEstimate = Math.round(lowEstimate * 1.22);

  res.json({
    squareFootage,
    roofSquares: squares,
    materialSelected: material,
    lifespanExpectancy: materialLifespan,
    pitch,
    stories,
    breakdown: {
      materials: materialsPortion,
      certifiedLabor: laborPortion,
      tearOffAndDisposal: tearOffCost,
      ventilationFlashingPermits: ventilationAndPermits,
      estimatedLow: lowEstimate,
      estimatedHigh: highEstimate,
      suggestedAverage: Math.round((lowEstimate + highEstimate) / 2)
    },
    disclaimer: 'This indicative estimate is calculated using sample regional pricing benchmarks. Exact quotations require a certified on-site or high-resolution drone inspection to evaluate roof deck condition, valleys, penetration count, and localized building codes.'
  });
});

// ----------------------------------------------------
// AI Damage Assessment Scanner (Computer Vision Simulation)
// ----------------------------------------------------
app.post('/api/damage-assess', (req, res) => {
  const { imageBase64, filename } = req.body;

  // Simulated AI vision model analyzing roof imagery
  const mockDetections = [
    {
      id: "det-1",
      defectType: "Missing & Wind-Lifted Shingles",
      confidence: 0.94,
      severity: "High",
      boundingBox: { x: 38, y: 28, width: 24, height: 18 },
      explanation: "Multiple shingle tabs lifted or missing along the windward slope. Exposed underlying felt leaves decking vulnerable to moisture penetration."
    },
    {
      id: "det-2",
      defectType: "Hail Impact & Granule Depletion",
      confidence: 0.89,
      severity: "Moderate",
      boundingBox: { x: 18, y: 55, width: 30, height: 22 },
      explanation: "Circular impact fractures and asphalt bruising observed. Loss of UV protective mineral granules accelerates accelerated asphalt degradation."
    },
    {
      id: "det-3",
      defectType: "Chimney Flashing Deterioration",
      confidence: 0.82,
      severity: "Moderate",
      boundingBox: { x: 68, y: 15, width: 20, height: 24 },
      explanation: "Step flashing sealant compromised with visible separation along the masonry juncture."
    }
  ];

  const overallScore = 48; // out of 100
  const conditionGrade = "Needs Immediate Attention";

  res.json({
    analysisId: `scan-${Date.now()}`,
    scannedAt: new Date().toISOString(),
    overallHealthScore: overallScore,
    conditionGrade,
    findingsCount: mockDetections.length,
    detections: mockDetections,
    recommendations: [
      "Schedule a certified drone/ladder inspection within 7 days to verify deck moisture levels.",
      "Document high-resolution photos for insurance claim carrier verification.",
      "Install temporary tarping if active precipitation is forecasted."
    ],
    disclaimer: "Notice: This AI-assisted visual assessment is an exploratory diagnostic tool based on visible photographic indicators. It does not replace a comprehensive, in-person physical inspection or structural engineering assessment."
  });
});

// ----------------------------------------------------
// AI Roof Visualizer Simulation
// ----------------------------------------------------
app.post('/api/visualize', (req, res) => {
  const { material, color, homeStyle, userImage } = req.body;

  // Curated photorealistic visualizer outcomes
  const visualLibrary: Record<string, Record<string, string>> = {
    'Standing Seam Metal Roofing': {
      'Charcoal': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'Matte Black': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'Pacific Blue': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'Burnished Copper': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    },
    'Architectural Asphalt Shingles': {
      'Weathered Wood': 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80',
      'Charcoal': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'Slate Grey': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'Colonial Red': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'
    },
    'Spanish Clay Tile': {
      'Terra Cotta': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'Antiqued Mission': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    },
    'Natural Slate': {
      'Charcoal': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'Vermont Green': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'
    }
  };

  const selectedMaterialGroup = visualLibrary[material] || visualLibrary['Standing Seam Metal Roofing'];
  const previewUrl = selectedMaterialGroup[color] || Object.values(selectedMaterialGroup)[0];

  res.json({
    visualId: `vis-${Date.now()}`,
    material,
    color,
    homeStyle: homeStyle || 'Modern Suburban Residence',
    previewUrl,
    specs: {
      energyStarRated: material.includes('Metal') || material.includes('Tile'),
      curbAppealIndex: '98/100',
      windResistance: material.includes('Metal') ? 'Up to 140 MPH' : 'Up to 130 MPH',
      fireRating: 'Class A Fire Resistant'
    },
    disclaimer: 'Renderings generated are visual representations for architectural concept preview. Actual material appearance, panel reflections, and shingle hue may vary under different sun angles and environmental lighting conditions.'
  });
});

// ----------------------------------------------------
// AI Roofing Chatbot Assistant
// ----------------------------------------------------
app.post('/api/ai-chat', (req, res) => {
  const { message, conversationHistory } = req.body;
  const lower = (message || '').toLowerCase();

  let reply = "I'm here to help with any roofing questions! We provide free drone-assisted inspections, complete roof replacements, storm restoration, and premium 3D design visualizers. Would you like to check if your ZIP code is within our express service zone, or get an indicative quote?";
  let suggestedActions = ["Get a Free Estimate", "Check My ZIP Code", "Schedule Storm Inspection", "Compare Materials"];

  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('quote')) {
    reply = "Roof costs generally range depending on square footage, pitch, and materials. For example, Architectural Asphalt Shingles typically run from $400 - $550 per square (installed), while Standing Seam Metal averages $800 - $1,100 per square. We offer 100% free, no-obligation on-site estimates with exact measurements. Would you like to try our instant Cost Estimator calculator or book an inspector?";
    suggestedActions = ["Launch Cost Estimator", "Book Free Inspection", "Financing Options"];
  } else if (lower.includes('storm') || lower.includes('hail') || lower.includes('wind') || lower.includes('leak') || lower.includes('emergency')) {
    reply = "If you have experienced hail, wind damage, or an active roof leak, time is critical to prevent mold or decking rot! We provide emergency tarping and thorough insurance claim documentation. Our team can meet directly with your insurance adjuster to ensure all damage is properly accounted for.";
    suggestedActions = ["Emergency Repair Call", "Storm Damage Center", "Upload Photos for Analysis"];
  } else if (lower.includes('metal') || lower.includes('shingle') || lower.includes('tile') || lower.includes('material')) {
    reply = "Great question! Architectural shingles offer unmatched value and a 25-30 year lifespan. Standing Seam Metal provides 50-70+ years of durability, Class A fire rating, and superior energy efficiency in Texas heat. Clay Tile and Slate offer historic beauty and century-long endurance. You can customize them in our real-time 3D House Visualizer!";
    suggestedActions = ["Open 3D House Visualizer", "View Materials Guide", "Request Material Samples"];
  } else if (lower.includes('free inspection') || lower.includes('estimate') || lower.includes('schedule') || lower.includes('book')) {
    reply = "Our comprehensive on-site inspections are 100% free for homeowners in our service regions! We inspect decking, flashing, pipe boots, attic ventilation, and shingles with drone photography. You receive a complete written report and estimate with zero pressure.";
    suggestedActions = ["Book Inspection Now", "Call (800) 555-APPY"];
  } else if (lower.includes('warranty') || lower.includes('guarantee') || lower.includes('insurance')) {
    reply = "Every Appy roof comes backed with up to a 50-Year Non-Prorated Manufacturer Warranty (GAF Master Elite / CertainTeed SELECT) plus our exclusive Appy 10-Year or Lifetime Workmanship Warranty. We also assist with full insurance claim paperwork.";
    suggestedActions = ["View Warranty Details", "Read Customer Reviews"];
  }

  res.json({
    reply,
    suggestedActions,
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Customer Project Portal Lookup
// ----------------------------------------------------
app.get('/api/portal/project/:id', (req, res) => {
  const db = readDb();
  const id = req.params.id.trim().toUpperCase();
  const project = db.projects.find(p => p.projectNumber.toUpperCase() === id || p.id.toUpperCase() === id);

  if (!project) {
    return res.status(404).json({
      error: `Project #${id} not found. Try searching for demo project APX-7821 or APX-6502.`
    });
  }

  res.json(project);
});

// ----------------------------------------------------
// Maintenance Subscription
// ----------------------------------------------------
app.post('/api/maintenance-subscribe', (req, res) => {
  const db = readDb();
  const { email, name, zipCode, preferences } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const newSub: MaintenanceSubscriber = {
    id: `sub-${Date.now()}`,
    email,
    name: name || 'Homeowner',
    zipCode: zipCode || '75201',
    preferences: preferences || ['Spring Maintenance', 'Post-Storm Alerts', 'Annual Inspection'],
    createdAt: new Date().toISOString()
  };

  db.subscribers.push(newSub);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'You have been successfully enrolled in Appy Roofing Care Reminders. You can adjust your frequency or unsubscribe at any time.'
  });
});

// ----------------------------------------------------
// Reviews API
// ----------------------------------------------------
app.get('/api/reviews', (req, res) => {
  const db = readDb();
  res.json({
    rating: 4.9,
    reviewCount: 387,
    reviews: db.reviews
  });
});

app.post('/api/reviews', (req, res) => {
  const db = readDb();
  const { author, location, rating, service, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: 'Name and review content are required.' });
  }

  const newRev: Review = {
    id: `rev-${Date.now()}`,
    author,
    location: location || 'Verified Customer',
    rating: Number(rating) || 5,
    service: service || 'Roofing Service',
    date: 'Just now',
    content,
    verified: true,
    source: 'Direct'
  };

  db.reviews.unshift(newRev);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback! Your review has been submitted.',
    review: newRev
  });
});

// Serve static build in production
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Appy Roofing Co. Backend API running on port ${PORT}`);
});
