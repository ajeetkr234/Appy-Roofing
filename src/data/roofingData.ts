import { ServiceItem, RoofingProblem, RoofingMaterial, RoofLayer, FAQItem, TeamMember, ProjectItem } from '../types';

export const BUSINESS_INFO = {
  brandName: "APPY ROOFING CO.",
  tagline: "Protecting Your Home. Building Your Future.",
  phone: "(800) 555-APPY",
  phoneRaw: "+18005552779",
  email: "contact@appyroofingdemo.com",
  hqAddress: "742 Evergreen Terrace, Suite 400, Dallas, TX 75201",
  licenseInfo: "TX Lic. #ROOF-84920-B | Fully Insured ($2M General Liability & Workers' Comp)",
  hours: "Mon – Fri: 7:00 AM – 7:00 PM | Sat: 8:00 AM – 4:00 PM | 24/7 Emergency Storm Dispatch"
};

export const SERVICES_DATA: ServiceItem[] = [
  // Residential (1-12)
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    category: "Residential",
    shortDesc: "Complete architectural tear-off and precision installation with lifetime warranty options.",
    fullDesc: "Our comprehensive roof replacement process starts with a full tear-off down to the structural decking. We inspect the wood sheathing, install synthetic moisture barriers, leak barriers, drip edges, starter strips, and high-performance shingles or metal panels engineered for maximum wind and hail resistance.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    features: ["Complete Decking Inspection & Repair", "Premium Synthetic Underlayment", "Ice & Water Shield in Valleys", "50-Year Non-Prorated Warranty Options"],
    turnaround: "1 - 2 Days for most residential homes",
    warranty: "Lifetime Workmanship + 50-Year Manufacturer Warranty",
    idealFor: "Roofs over 18-20 years old, severe storm damage, or major remodeling."
  },
  {
    id: "roof-repair",
    title: "Roof Repair",
    category: "Residential",
    shortDesc: "Targeted repairs for damaged shingles, punctures, lifted tabs, and minor structural wear.",
    fullDesc: "Don't let minor issues escalate into costly attic leaks. Our skilled repair technicians quickly locate damaged shingles, broken seals, compromised pipe boots, and cracked cement collars, restoring weather-tight integrity without requiring a full roof replacement.",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80",
    features: ["Exact Shingle Color Matching", "Sub-surface Decking Check", "Fast Same-Day Dispatch", "10-Year Repair Seal Guarantee"],
    turnaround: "2 - 4 Hours",
    warranty: "5-Year Leak-Free Repair Warranty",
    idealFor: "Isolated wind uplift, fallen tree limb damage, or nail pops."
  },
  {
    id: "roof-installation",
    title: "New Roof Installation",
    category: "Residential",
    shortDesc: "Engineered roofing for custom new home construction and structural architectural additions.",
    fullDesc: "Partnering with leading custom home builders and architects across the United States, we design and construct precision roofing systems configured to match complex roof geometries, turrets, dormers, and modern overhang profiles.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    features: ["CAD Blueprint Integration", "Rigid Truss & Deck Verification", "Custom Flashing Fabrication", "Architectural Coordination"],
    turnaround: "Scheduled with general contractor milestones",
    warranty: "Full 25-Year System Warranty",
    idealFor: "New home builds, secondary home additions, and guesthouse structures."
  },
  {
    id: "roof-inspection",
    title: "Roof Inspection",
    category: "Residential",
    shortDesc: "Certified 21-point physical inspection paired with high-resolution 4K drone diagnostics.",
    fullDesc: "We provide an unvarnished, photographic assessment of your entire roofing envelope: chimney counter-flashing, valley conditions, soffit intake airflow, shingle granule adhesion, and attic thermal ventilation checks.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    features: ["4K Drone Aerial Imaging", "Attic Moisture & Thermal Scan", "Comprehensive Written PDF Report", "Zero Obligation Consultation"],
    turnaround: "Same-Day PDF Report Delivery",
    warranty: "Certified Official Documentation",
    idealFor: "Annual preventative checkups, home purchases, and post-storm assessments."
  },
  {
    id: "roof-leak-repair",
    title: "Roof Leak Repair",
    category: "Residential",
    shortDesc: "Pinpoint thermal imaging to trace hidden leak paths and eradicate moisture intrusion.",
    fullDesc: "Water travels along rafters before dropping onto ceilings. We use electronic moisture meters and thermal cameras to identify the exact entry point outside, eliminating recurring drywall stains and framing rot permanently.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    features: ["Thermal Detection Equipment", "Decking Saturation Tests", "Permanent Flashing Re-seat", "Drywall Moisture Check"],
    turnaround: "Emergency response within 2 hours",
    warranty: "100% No-Leak Guarantee",
    idealFor: "Ceiling water rings, dripping skylights, and wet insulation."
  },
  {
    id: "asphalt-shingle-roofing",
    title: "Asphalt Shingle Roofing",
    category: "Residential",
    shortDesc: "Class 4 impact-rated architectural shingles offering superior curb appeal and wind resistance.",
    fullDesc: "The quintessential American choice refined with modern fiberglass core technology. We install GAF Timberline HDZ, CertainTeed Landmark, and Owens Corning Duration shingles engineered to withstand up to 130 MPH gale-force winds.",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80",
    features: ["Class 4 Impact Resistance (Hail Discount)", "StainGuard Algae Protection", "Dimensional Shadow Lines", "Color Matrix Palette"],
    turnaround: "1 - 2 Days",
    warranty: "50-Year Non-Prorated Coverage",
    idealFor: "Traditional, Craftsman, Ranch, and Suburban American homes."
  },
  {
    id: "metal-roofing",
    title: "Metal Roofing",
    category: "Residential",
    shortDesc: "Commercial-grade 24-gauge standing seam metal roofs engineered for 50+ year longevity.",
    fullDesc: "Metal roofing is the ultimate investment in modern architectural beauty, energy efficiency, and total storm protection. Hidden fasteners prevent thermal expansion leaks, reflecting up to 70% of solar heat to slash summer air conditioning utility expenses.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    features: ["Class A Fire Rating", "Concealed Fastener Standing Seam", "Kynar 500 Fade-Resistant Coating", "140+ MPH Wind Certified"],
    turnaround: "2 - 4 Days",
    warranty: "50-Year Lifetime Transferable Warranty",
    idealFor: "Modern Farmhouse, Contemporary, Mountain, and Coastal residences."
  },
  {
    id: "tile-roofing",
    title: "Tile Roofing",
    category: "Residential",
    shortDesc: "Authentic barrel clay and concrete tiles delivering historic Spanish mission and Mediterranean luxury.",
    fullDesc: "Handcrafted clay and high-density concrete tiles provide extraordinary thermal mass, natural acoustic dampening, and unmistakable architectural distinction that increases your property's resale appraisal value.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    features: ["Natural Clay & Concrete Compounds", "Class A Fireproof Classification", "Engineered Truss Weight Analysis", "Interlocking Weather Seals"],
    turnaround: "3 - 5 Days",
    warranty: "75-Year Material Life Expectancy",
    idealFor: "Spanish Colonial, Mediterranean, Tuscan, and Southwest estates."
  },
  {
    id: "slate-roofing",
    title: "Slate Roofing",
    category: "Residential",
    shortDesc: "Quarried natural slate stone roofs engineered to endure over a century of extreme elements.",
    fullDesc: "Known as the forever roof, genuine natural stone slate quarried in North America delivers natural cleft textures, subtle mineral veining, and imperviousness to frost, fire, and rot that outlasts multiple generations.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    features: ["100% Genuine North American Stone", "Non-Combustible Grade S1 Slate", "Copper Nail Mechanical Fasteners", "Zero Petrochemical Decay"],
    turnaround: "5 - 8 Days",
    warranty: "100-Year Historic Durability",
    idealFor: "Historic landmarks, luxury estates, and traditional estates."
  },
  {
    id: "flat-roofing",
    title: "Flat Roofing",
    category: "Residential",
    shortDesc: "Single-ply membrane systems (TPO, PVC, EPDM) for contemporary flat decks and patios.",
    fullDesc: "Eliminate ponding water on modern flat roof residences, rooftop terraces, carports, and home additions. We hot-air weld reinforced thermoplastic seams creating a monolithic, impermeable barrier.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
    features: ["Heat-Welded 60-mil Membranes", "High-Density Polyiso Insulation", "Seamless Scupper & Drain Sump Design", "Cool Roof Solar Reflectance"],
    turnaround: "1 - 3 Days",
    warranty: "25-Year Commercial Grade Warranty",
    idealFor: "Mid-century modern homes, walkout balconies, and sunroom additions."
  },
  {
    id: "roof-ventilation",
    title: "Roof Ventilation",
    category: "Residential",
    shortDesc: "Balanced intake and exhaust airflow systems to reduce attic heat and prevent moisture rot.",
    fullDesc: "Trapped heat in attics can reach 150°F in summer, baking your shingles from underneath and inflating electricity bills. We engineer continuous ridge vents, baffled soffit vents, and solar attic fans to balance intake and exhaust.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    features: ["Continuous Shingle-Over Ridge Vents", "Calculated Net Free Vent Area (NFVA)", "Solar Attic Fan Retrofits", "Soffit Baffle Airflow Channels"],
    turnaround: "Half Day",
    warranty: "Lifetime Airflow Balance Warranty",
    idealFor: "Hot upper-story rooms, high AC bills, and winter ice damming."
  },
  {
    id: "roof-maintenance",
    title: "Roof Maintenance",
    category: "Residential",
    shortDesc: "Annual preventative tune-ups to extend roof lifespan and protect manufacturer warranty status.",
    fullDesc: "Routine maintenance is the most cost-effective way to add 7-10 years to your roof's working lifespan. Our technicians reseal pipe jacks, secure loose flashing, clean moss growth, and inspect fasteners.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    features: ["High-Temp Polyurethane Resealing", "Debris Clearance from Valleys", "Loose Fastener Resetting", "Full Attic Seal Check"],
    turnaround: "2 Hours",
    warranty: "Annual Proof of Maintenance Certificate",
    idealFor: "All homeowners seeking to preserve warranties and prevent surprise leaks."
  },

  // Storm and Emergency (13-17)
  {
    id: "storm-damage-restoration",
    title: "Storm Damage Restoration",
    category: "Storm and Emergency",
    shortDesc: "Full-scale restoration following severe convective thunderstorms, tornadoes, and microbursts.",
    fullDesc: "Severe storms can tear off entire roof planes in seconds. Our storm restoration division deploys mobile command trailers with rapid mitigation, emergency board-ups, and structural dry-in teams.",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    features: ["Rapid Emergency Board-Up & Tarping", "Drone Orthomosaic Mapping", "Direct Insurance Carrier Coordination", "Structural Stability Audit"],
    turnaround: "Emergency dry-in within hours",
    warranty: "Full Replacement Lifetime Warranty",
    idealFor: "Properties affected by severe storm paths and localized wind shear."
  },
  {
    id: "hail-damage-repair",
    title: "Hail Damage Repair",
    category: "Storm and Emergency",
    shortDesc: "Specialized detection of fractured shingle mats and granule bruising caused by hail.",
    fullDesc: "Hail strikes often cause unseen fractures below the surface mat, fracturing the fiberglass scrim without tearing the outer tab. Left unaddressed, UV exposure erodes the asphalt within 6 months, triggering widespread leaks.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    features: ["10'x10' Test Square Chalk Audits", "HVAC Fin & Vent Comb Damage Verification", "Adjuster Meeting Representation", "Impact Shingle Upgrades"],
    turnaround: "1 - 2 Days for installation",
    warranty: "Class 4 Impact Warranty Options",
    idealFor: "Homes hit by hail storms with nickel to golf-ball sized stones."
  },
  {
    id: "wind-damage-repair",
    title: "Wind Damage Repair",
    category: "Storm and Emergency",
    shortDesc: "Repair of creased, lifted, and blown-off shingles after high-velocity straight-line winds.",
    fullDesc: "When wind gusts peel back shingles, the thermal seal strip breaks permanently, allowing rain to blow underneath. We replace severed tabs and install heavy-duty starter rows anchored for 130 MPH winds.",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80",
    features: ["Rake Edge and Ridge Re-anchoring", "Seal-Tab Thermal Reactivation", "Underlayment Patch & Seal", "Gutter Re-alignment"],
    turnaround: "Same-Day Priority Scheduling",
    warranty: "130 MPH Wind Warranty Rating",
    idealFor: "Shingles found in yard, exposed felt paper, and windward slope damage."
  },
  {
    id: "emergency-roof-repair",
    title: "Emergency Roof Repair",
    category: "Storm and Emergency",
    shortDesc: "24/7 on-call dispatch for active ceiling leaks, tree punctures, and sudden roof failures.",
    fullDesc: "Active roof punctures require immediate tactical intervention to prevent electrical hazards and structural dry-rot. Our emergency trucks carry heavy-duty nylon-reinforced poly tarps, sandbags, and lumber framing.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
    features: ["24/7 Immediate Telephone Dispatch", "Heavy-Duty Hurricane Tarp Securing", "Interior Water Diversion", "Priority Scheduling for Rebuild"],
    turnaround: "Dispatch under 90 minutes",
    warranty: "Weather-Tight Tarping Guarantee",
    idealFor: "Tree branches through roof, sudden ceiling collapses, and torrential rain breaches."
  },
  {
    id: "insurance-claim-assistance",
    title: "Insurance Claim Assistance",
    category: "Storm and Emergency",
    shortDesc: "Detailed itemized Xactimate estimates and adjuster walkthroughs to ensure fair coverage.",
    fullDesc: "Filing an insurance claim can be confusing. We provide forensic photo documentation, line-item Xactimate estimates matching insurance industry standards, and attend the adjuster meeting in person to advocate for your property.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    features: ["Xactimate 28 Line-Item Pricing", "On-Site Insurance Adjuster Meetings", "Code Upgrade Itemization", "Supplemental Claim Filing"],
    turnaround: "Full documentation pack in 24 hours",
    warranty: "Transparent Scope of Loss Verification",
    idealFor: "Homeowners filing storm, hail, wind, or tree impact insurance claims."
  },

  // Additional (18-23)
  {
    id: "gutter-installation",
    title: "Gutter Installation",
    category: "Additional",
    shortDesc: "Custom seamless aluminum and copper gutters roll-formed on-site to protect foundations.",
    fullDesc: "A roof is only as good as its drainage. We fabricate seamless 6-inch K-style and half-round gutters on-site, ensuring proper slope towards downspouts to prevent water from eroding your foundation or rotting fascia boards.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    features: ["On-Site Seamless Extrusion (.032 Heavy Gauge)", "Hidden Screw Hangers with 2ft Spacing", "Heavy-Duty 3x4 Downspouts", "Over 30 Factory Color Finishes"],
    turnaround: "1 Day",
    warranty: "20-Year No-Clog / No-Leak Warranty",
    idealFor: "Foundation protection, fascia rot prevention, and rainwater management."
  },
  {
    id: "gutter-repair",
    title: "Gutter Repair & Realignment",
    category: "Additional",
    shortDesc: "Fix sagging gutters, split miters, loose downspouts, and overflow backup points.",
    fullDesc: "Overflowing or detached gutters cause water to seep under roof eaves and into basements. We re-pitch sagging gutters, seal leaking corner miters with aerospace elastomeric sealant, and reinforce loose brackets.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    features: ["Laser Re-pitching for Optimal Drainage", "Fascia Board Reinforcement", "Seamless Corner Miter Resealing", "Downspout Cleanout Clears"],
    turnaround: "2 - 3 Hours",
    warranty: "5-Year Seal Warranty",
    idealFor: "Water spilling over gutters, pulling away from fascia, or leaking seams."
  },
  {
    id: "skylight-installation",
    title: "Skylight Installation & Replacement",
    category: "Additional",
    shortDesc: "Leak-free Velux solar-powered and deck-mounted skylights and Sun Tunnels.",
    fullDesc: "Brighten your interior with natural daylight without worrying about leaks. We install Velux No Leak Skylights engineered with triple-seal weather protection, Low-E insulated glass, and optional solar-powered blinds.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    features: ["Velux 10-Year No-Leak Warranty", "Solar-Powered Venting & Shades", "Laminated Low-E3 Clean Glass", "Custom Step Flashing Kits"],
    turnaround: "4 - 6 Hours per unit",
    warranty: "10-Year No-Leak Installation Warranty",
    idealFor: "Dim kitchens, dark hallways, vaulted living rooms, and bathroom upgrades."
  },
  {
    id: "roof-waterproofing",
    title: "Roof Waterproofing & Silicone Coatings",
    category: "Additional",
    shortDesc: "Fluid-applied high-solids silicone and elastomeric coatings that renew aging roofs.",
    fullDesc: "Extend the life of low-slope or commercial metal roofs by 15-20 years at a fraction of replacement cost. We spray seamless high-solids silicone coatings that create an impermeable barrier impervious to ponding water.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80",
    features: ["High-Solids 96% Pure Silicone", "Withstands 365 Days of Ponding Water", "85% Solar Reflectance / Title 24 Compliant", "Tear-off Free Application"],
    turnaround: "1 - 3 Days",
    warranty: "15 to 20-Year Renewable System Warranty",
    idealFor: "Commercial flat roofs, aging metal roofs, and large warehouse facilities."
  },
  {
    id: "commercial-roofing",
    title: "Commercial Roofing",
    category: "Additional",
    shortDesc: "Heavy-duty TPO, EPDM, PVC, and metal roofing for retail centers, offices, and warehouses.",
    fullDesc: "We provide commercial asset managers, retail centers, and industrial building owners with durable, energy-compliant roofing systems installed with zero disruption to daily tenant business operations.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    features: ["Certified Master Commercial Installers", "UL Class A & FM Global Wind Uplift Compliant", "Comprehensive Preventative Asset Plans", "Dedicated Commercial Account Executive"],
    turnaround: "Project-based timeline with milestones",
    warranty: "30-Year NDL (No Dollar Limit) Manufacturer Warranties",
    idealFor: "Shopping malls, office parks, schools, warehouses, and industrial complexes."
  },
  {
    id: "preventive-maintenance",
    title: "Preventive Maintenance Plans",
    category: "Additional",
    shortDesc: "Scheduled biannual inspection, cleaning, resealing, and priority emergency guarantee.",
    fullDesc: "Protect your real estate investment with our automated preventative maintenance membership. Includes bi-annual drone scans, priority post-storm response, gutter flushing, and discounted repair credits.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    features: ["Bi-Annual Spring & Fall Audits", "Free Gutter Debris Clearing", "Guaranteed 2-Hour Storm Dispatch Tarping", "Annual Maintenance Portal Log"],
    turnaround: "Ongoing Annual Service",
    warranty: "Preserves Active Manufacturer Warranties",
    idealFor: "Property managers, luxury residences, and commercial building portfolios."
  }
];

export const ROOFING_PROBLEMS: RoofingProblem[] = [
  {
    id: "prob-1",
    title: "Small Roof Leaks & Seepages",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Damp ceiling plaster", "Discolored drywall rings", "Musty odor in attic or closets", "Dripping sounds during prolonged downpours"],
    whyItHappens: "Water frequently bypasses compromised pipe vent boots, loosened step flashing along brick walls, or rusted valley seams, migrating horizontally across trusses before dripping.",
    consequences: "Dry rot of structural ceiling joists, ruined blown-in insulation R-value, toxic black mold spore germination, and expensive drywall repairs.",
    inspectionAdvice: "Professional inspection is advisable at the first sighting of a drywall ring—water damage spreads invisibly in ceiling cavities.",
    recommendedNextSteps: ["Isolate indoor belongings under drip buckets", "Schedule thermal imaging inspection", "Reflash compromised penetrations"]
  },
  {
    id: "prob-2",
    title: "Missing, Broken or Lifted Shingles",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Shingles scattered on lawn or in gutters", "Exposed black felt underlayment visible from street", "Curled shingle edges that lift with fingers"],
    whyItHappens: "High wind gusts create negative suction pressure over roof ridges. Once thermal sealant strips age and dry out, shingles flap and tear along nail lines.",
    consequences: "Direct rainwater exposure onto wood roof decking, resulting in structural softening, warping, and fast leak penetration into living areas.",
    inspectionAdvice: "Inspect immediately after any storm with recorded wind gusts above 45 MPH or whenever bald patches are spotted.",
    recommendedNextSteps: ["Cover exposed sections with protective tarp", "Check surrounding tabs for wind creases", "Perform color-matched shingle replacement"]
  },
  {
    id: "prob-3",
    title: "Damaged or Corroded Flashing",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Rusted metal around chimneys", "Cracked caulk along brick mortar lines", "Peeling valley metal", "Water tracks along chimney breast"],
    whyItHappens: "Thermal expansion and contraction causes metal step flashing and counter flashing to pull away from masonry and siding, deteriorating dried caulking.",
    consequences: "Flashing failure causes over 70% of all residential roof leaks, rotting roof rafters and chimney framing unnoticed for months.",
    inspectionAdvice: "Have flashing inspected annually, especially on homes older than 10 years or with brick chimneys.",
    recommendedNextSteps: ["Remove deteriorated tar sealant", "Install new copper or heavy-gauge aluminum step flashing", "Re-tuck mortar joints with polyurethane sealant"]
  },
  {
    id: "prob-4",
    title: "Poor Attic & Roof Ventilation",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Attic feels like an oven in summer (140°F+)", "Curling shingles with brittle backs", "Winter frost on attic nails", "Peeling exterior paint under eaves"],
    whyItHappens: "Imbalanced ratio between soffit intake vents and ridge exhaust vents traps extreme heat and condensation inside attic spaces.",
    consequences: "Shingle asphalt prematurely bakes and cracks, AC cooling bills skyrocket, and attic moisture rots OSB decking from the underside.",
    inspectionAdvice: "Inspect whenever upper-floor bedrooms struggle to stay cool or when shingles curl within 10 years of installation.",
    recommendedNextSteps: ["Calculate net free ventilating area", "Unblock soffits with baffles", "Cut and install high-flow ridge vent systems"]
  },
  {
    id: "prob-5",
    title: "Storm, Wind & Hail Impact",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Dents on gutters and downspouts", "Bruised shingles with exposed black substrate", "Excessive mineral granules washing out downspouts", "Shattered ridge caps"],
    whyItHappens: "Hailstones striking at terminal velocity fracture the asphalt matrix and dislodge protective ceramic granules that shield against UV rays.",
    consequences: "Unprotected asphalt breaks down rapidly under sunlight, leading to leaks within 3 to 12 months after the storm.",
    inspectionAdvice: "Schedule a certified insurance claim inspection within 30 days of any severe hail storm in your zip code.",
    recommendedNextSteps: ["Document roof and property collateral damage", "Verify impact test square metrics", "File insurance claim with contractor representation"]
  },
  {
    id: "prob-6",
    title: "Aging & Deteriorating Roofing Materials",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Bald spots on shingles", "Surface cracking and clawing", "Brittle feel when handled", "Over 20 years since last replacement"],
    whyItHappens: "Decades of relentless ultraviolet solar radiation, temperature cycling, and wind deplete the natural oils within the asphalt shingle binder.",
    consequences: "Catastrophic water failure during heavy rains, deck saturation, and loss of insurability or high deductible penalties.",
    inspectionAdvice: "Roofs over 18 years old should be inspected annually to plan a proactive replacement before water destroys interior ceilings.",
    recommendedNextSteps: ["Evaluate remaining shingle life index", "Compare modern Class 4 shingle and metal options", "Request a comprehensive replacement estimate"]
  },
  {
    id: "prob-7",
    title: "Ceiling & Wall Water Stains",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Yellowish-brown circular rings on ceilings", "Sagging drywall tape", "Blistering paint bubbles on walls", "Stained crown molding"],
    whyItHappens: "Water penetrating the roof envelope pools on top of drywall until saturation breaches the surface paint, revealing stains.",
    consequences: "Ceiling collapse under pooled water weight, ruined personal property, mold propagation in wall cavities.",
    inspectionAdvice: "Urgent. Do not paint over water stains without first locating and repairing the exterior source on the roof.",
    recommendedNextSteps: ["Relieve pressure by puncturing bubble if holding water", "Perform attic rafter trace", "Seal external penetration point"]
  },
  {
    id: "prob-8",
    title: "Gutter Backups & Fascia Board Rot",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Water cascading over gutter front during rain", "Soft, spongy wood along roof eaves", "Gutter pulling away from roofline", "Moss on siding"],
    whyItHappens: "Leaves and debris clog downspouts, causing gutter troughs to overflow backwards behind the metal drip edge and soak wooden fascia boards.",
    consequences: "Rotted sub-fascia, loosened rafter tails, insect and squirrel infestations entering attics, and foundation foundation erosion.",
    inspectionAdvice: "Inspect gutters and fascia twice per year (spring and autumn).",
    recommendedNextSteps: ["Clean gutters and flush downspouts", "Replace decayed fascia boards with primed lumber", "Install proper oversized drip edge and gutter guards"]
  },
  {
    id: "prob-9",
    title: "Roof Decking Deterioration & Sagging",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Spongy or bouncy sensation when walking on roof", "Wavy or dipped roofline profile", "Delaminated plywood seen from inside attic", "Sagging between rafters"],
    whyItHappens: "Long-term minor leaks or chronic attic condensation rot the structural plywood or OSB sheets from the bottom up.",
    consequences: "Risk of decking punch-through under foot traffic or snow load, compromising roof structural integrity.",
    inspectionAdvice: "Requires immediate structural evaluation before any walking or repair occurs.",
    recommendedNextSteps: ["Tear off shingles over soft spots", "Remove and replace rotten decking with CDX plywood", "Reinforce rafter supports"]
  },
  {
    id: "prob-10",
    title: "Attic Moisture & Toxic Mold Risks",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
    warningSigns: ["Dark fuzzy patches on roof sheathing in attic", "Persistent musty smell in HVAC vents", "Allergy flare-ups indoors", "Rusted roofing nails in attic"],
    whyItHappens: "Bathroom exhaust fans improperly vented into attics combined with roof moisture ingress creates high humidity where mold thrives on organic wood.",
    consequences: "Severe indoor air quality health risks, respiratory irritation, and major mold remediation expenses costing thousands.",
    inspectionAdvice: "Inspect attic spaces biannually for black or white microbial growth on wood sheathing.",
    recommendedNextSteps: ["Direct vent fans outside through roof caps", "Eradicate microbial growth with EPA disinfectant", "Seal active moisture leaks and improve ventilation"]
  }
];

export const ROOFING_MATERIALS: RoofingMaterial[] = [
  {
    id: "asphalt-shingles",
    name: "Architectural Asphalt Shingles",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=600&q=80",
    shortDesc: "The gold standard of North American residential roofing, balancing affordability, durability, and classic dimensional beauty.",
    advantages: ["Most cost-effective upfront investment", "Massive variety of colors and textures", "Class 4 impact-resistant hail options", "Easy to repair and replace if needed"],
    disadvantages: ["Shorter lifespan than metal or slate", "Susceptible to wind uplift if improperly nailed", "Vulnerable to extreme heat granule loss"],
    suitableApplications: "Residential homes, steep-slope suburban architecture, rental properties, and historic neighborhoods.",
    maintenanceRequirements: "Biannual inspection, debris clearing from valleys, and moss treatment if under tree shade.",
    typicalDurability: "25 – 30+ Years (climate and maintenance dependent)",
    priceLevel: "$$",
    availableStyles: ["Dimensional Architectural", "Triple-Laminate Luxury", "Standard 3-Tab"]
  },
  {
    id: "metal-roofing",
    name: "Standing Seam Metal Roofing",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Precision-engineered 24-gauge steel or aluminum panels with concealed fasteners and high thermal reflectance.",
    advantages: ["50-70+ year operational lifespan", "Class A fire resistance and 140+ MPH wind rating", "Reflects solar radiation to cut cooling costs", "Virtually zero maintenance required"],
    disadvantages: ["Higher initial material and skilled labor investment", "Requires specialized fabrication equipment", "Can dent under very large hail (>2.5 inches)"],
    suitableApplications: "Modern homes, modern farmhouses, coastal residences, mountain cabins, and commercial storefronts.",
    maintenanceRequirements: "Periodic inspection of flashing and pipe penetrations every 5 years.",
    typicalDurability: "50 – 70+ Years",
    priceLevel: "$$$",
    availableStyles: ["Concealed Fastener Standing Seam", "Exposed Fastener Ribbed", "Metal Shingle/Tile Profile"]
  },
  {
    id: "clay-tiles",
    name: "Spanish Clay Tiles",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Timeless handcrafted natural clay baked into barrel profiles for Mediterranean and Spanish Colonial elegance.",
    advantages: ["Natural fireproof and non-decaying material", "Outstanding thermal mass insulation against desert/southern heat", "Iconic architectural prestige", "Unmatched lifespan of a century"],
    disadvantages: ["Heavy weight requires structural truss engineering", "Fragile under direct foot traffic", "Higher installation cost"],
    suitableApplications: "Spanish Colonial, Mediterranean, Tuscan, Mission-style, and luxury custom homes.",
    maintenanceRequirements: "Inspecting underlying membrane every 15-20 years; replacing occasionally cracked individual tiles.",
    typicalDurability: "75 – 100+ Years (underlayment requires renewal every 25-30 years)",
    priceLevel: "$$$$",
    availableStyles: ["Barrel Mission (S-Tile)", "Spanish High-Profile", "Flat Clay Shingle"]
  },
  {
    id: "concrete-tiles",
    name: "Concrete Roof Tiles",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Dense hydraulic-pressed concrete tiles offering similar beauty to clay at a more accessible investment level.",
    advantages: ["Highly durable against hail and wind", "Molded to mimic slate, wood shake, or clay tile", "Excellent resistance to freeze-thaw cycles", "Non-combustible Class A rating"],
    disadvantages: ["Heavy structural weight", "Efflorescence or surface color fade over decades", "Requires skilled tile roofers"],
    suitableApplications: "Suburban luxury communities, HOA planned developments, and Southwest architecture.",
    maintenanceRequirements: "Periodic pressure wash and resealing if desired; check underlayment at 25 years.",
    typicalDurability: "50 – 75 Years",
    priceLevel: "$$$",
    availableStyles: ["High Profile Spanish", "Low Profile Mediterranean", "Flat Shake/Slate Texture"]
  },
  {
    id: "slate",
    name: "Natural Quarried Slate",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Genuine quarried metamorphic stone with natural cleft texture and unrivaled century-long longevity.",
    advantages: ["Lasts 100 to 150+ years (The Forever Roof)", "Natural stone is totally impervious to fire and rot", "Unsurpassed luxury architectural beauty", "Boosts property appraisal substantially"],
    disadvantages: ["Heaviest roofing material (structural assessment mandatory)", "Highest initial cost", "Requires specialized master slate craftsmen"],
    suitableApplications: "Historic restorations, luxury custom estates, university buildings, and European-inspired chateaus.",
    maintenanceRequirements: "Annual visual inspection for broken slates; replace with copper slip hooks.",
    typicalDurability: "100 – 150+ Years",
    priceLevel: "$$$$",
    availableStyles: ["Standard Cleft", "Graduated Thickness", "Multicolor Patterned"]
  },
  {
    id: "tpo",
    name: "TPO (Thermoplastic Polyolefin)",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "The dominant modern single-ply reflective membrane for low-slope and commercial buildings.",
    advantages: ["Heat-welded seams form a continuous waterproof barrier", "Brilliant white surface reflects UV and cuts cooling costs", "Resistant to grease, bacteria, and punctures", "Outstanding value for flat roofs"],
    disadvantages: ["Requires skilled hot-air welding equipment", "Varying quality across budget manufacturers"],
    suitableApplications: "Commercial buildings, retail plazas, residential flat roofs, rooftop decks, and mid-century moderns.",
    maintenanceRequirements: "Semi-annual debris clearing from scuppers, drain inspection.",
    typicalDurability: "25 – 35 Years",
    priceLevel: "$$",
    availableStyles: ["Smooth White (Cool Roof)", "Gray", "Tan"]
  },
  {
    id: "epdm",
    name: "EPDM Synthetic Rubber",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Highly flexible synthetic black rubber membrane engineered for extreme temperature swings.",
    advantages: ["Incredible elasticity in freezing and thawing cycles", "Fast installation over large flat square footage", "Proven 40-year track record in commercial roofing"],
    disadvantages: ["Black surface absorbs heat unless coated", "Seams joined with tape/adhesive (not welded like TPO)"],
    suitableApplications: "Northern climate flat roofs, residential sunrooms, commercial warehouses, and carports.",
    maintenanceRequirements: "Checking seam adhesives and flashing terminations every 3 years.",
    typicalDurability: "25 – 35 Years",
    priceLevel: "$$",
    availableStyles: ["Standard Black 60-mil", "Reinforced EPDM"]
  },
  {
    id: "pvc",
    name: "PVC (Polyvinyl Chloride)",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Premium commercial thermoplastic membrane engineered with exceptional chemical and grease resistance.",
    advantages: ["Extremely strong heat-welded seams", "Impervious to restaurant grease traps, chemicals, and acid rain", "Permanent flexibility and Class A fire resistance"],
    disadvantages: ["Higher cost than standard TPO", "Older formulations could become brittle if plasticizers migrate"],
    suitableApplications: "Restaurants, industrial facilities, hospitals, airports, and luxury flat roof residences.",
    maintenanceRequirements: "Periodic drain cleanout and annual seam audit.",
    typicalDurability: "30 – 40 Years",
    priceLevel: "$$$",
    availableStyles: ["White Cool Roof", "Fiberglass-Reinforced PVC"]
  },
  {
    id: "modified-bitumen",
    name: "Modified Bitumen (Mod-Bit)",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Modern evolution of traditional built-up asphalt roofing reinforced with fiberglass or polyester mats.",
    advantages: ["Multi-ply thickness provides superior puncture resistance", "Granule-surfaced cap sheet resists UV weathering", "Flexible self-adhering or torch-down options", "High foot-traffic tolerance"],
    disadvantages: ["Heavier than single-ply TPO", "Torch-down application requires strict fire safety precautions"],
    suitableApplications: "Balcony decks, HVAC equipment roofs, residential flat roof sections, and multi-family complexes.",
    maintenanceRequirements: "Check flashing seams and re-coat with reflective elastomeric if needed after 15 years.",
    typicalDurability: "20 – 30 Years",
    priceLevel: "$$",
    availableStyles: ["Granule Cap Sheet", "Smooth Surface (with reflective coating)"]
  }
];

export const EXPLODED_ROOF_LAYERS: RoofLayer[] = [
  {
    id: "layer-decking",
    number: 1,
    name: "Roof Decking (Sheathing)",
    subtitle: "The Structural Foundation",
    purpose: "Provides the continuous wooden structural substrate that bears the entire roofing load and anchors mechanical fasteners.",
    benefits: [
      "Rigid CDX plywood or OSB rated sheathing",
      "Transfers structural wind loads directly into trusses",
      "Tested for proper nailing schedule and no soft wood rot",
      "Creates the flat plane necessary for shingle alignment"
    ],
    installationConsiderations: "Must have 1/8-inch expansion gap between sheets to prevent buckling during high humidity; rotted sheets must be fully removed.",
    specs: "7/16\" or 1/2\" APA-rated structural plywood/OSB",
    color: "#B45309"
  },
  {
    id: "layer-underlayment",
    number: 2,
    name: "Synthetic Felt Underlayment",
    subtitle: "Secondary Water Barrier",
    purpose: "Acts as a breathable secondary defense against wind-driven moisture that penetrates between shingles.",
    benefits: [
      "High-tensile woven polypropylene fibers",
      "25x stronger tear resistance than old organic black paper",
      "Impervious to mold and UV breakdown during installation",
      "Non-skid walking surface for crew safety"
    ],
    installationConsiderations: "Installed with a 4-inch minimum horizontal overlap and 6-inch end laps, secured using plastic cap nails to prevent moisture wicking.",
    specs: "GAF FeltBuster / CertainTeed RoofRunner",
    color: "#2563EB"
  },
  {
    id: "layer-ice-water",
    number: 3,
    name: "Ice & Water Protection Barrier",
    subtitle: "Self-Adhering Waterproof Shield",
    purpose: "Seals vulnerable low-pitch areas, roof valleys, chimneys, and eaves against standing water and ice dam backups.",
    benefits: [
      "Elastomeric modified asphalt membrane with split-back release",
      "Direct self-adhesion to wood decking",
      "Self-seals tightly around every roofing nail driven through it",
      "Mandatory code protection in freeze-thaw storm zones"
    ],
    installationConsiderations: "Applied in all valleys, around skylights, dormer junctions, and 3 feet past interior heated wall lines on eaves.",
    specs: "GAF WeatherWatch / Grace Ice & Water Shield (50-mil)",
    color: "#059669"
  },
  {
    id: "layer-flashing",
    number: 4,
    name: "Drip Edge & Metal Flashing",
    subtitle: "Perimeter Deflection Engineering",
    purpose: "Directs water run-off cleanly into gutters and shields vulnerable joints where roof planes meet walls, chimneys, and eaves.",
    benefits: [
      "Corrosion-resistant baked enamel aluminum or copper",
      "Eliminates water surface tension from rotting wood fascia",
      "Interlocking step flashing along brick and siding lines",
      "Integrated kickout flashing prevents wall cavity rot"
    ],
    installationConsiderations: "Installed over underlayment on rakes and under underlayment on eaves, with overlapping joints sealed with high-temp sealant.",
    specs: "Heavy-gauge T-style aluminum / 16-oz cold rolled copper",
    color: "#94A3B8"
  },
  {
    id: "layer-shingles",
    number: 5,
    name: "Roofing Shingles / Metal Panels",
    subtitle: "Primary Weather & Impact Shield",
    purpose: "The exterior primary armor against driving rain, hail stones, solar ultraviolet radiation, and gale-force winds.",
    benefits: [
      "Class 4 impact resistance against hail bruising",
      "Advanced ceramic mineral granules reflect UV rays",
      "DuraGrip adhesive strips seal panels against 130 MPH winds",
      "Stunning dimensional curb appeal with deep shadow profiles"
    ],
    installationConsiderations: "Installed with 6-nail high-wind fastener pattern directly into common bond nail zones, with staggered offset exposures.",
    specs: "CertainTeed Landmark / GAF Timberline HDZ / 24-Ga Metal",
    color: "#334155"
  },
  {
    id: "layer-ridge-caps",
    number: 6,
    name: "High-Profile Ridge Caps",
    subtitle: "Appy Protection & Aesthetic Crown",
    purpose: "Seals the highest peak and hips of the roof structure while adding high-definition architectural dimensionality.",
    benefits: [
      "Multi-layer thickness matches shingle depth",
      "Specially formulated to bend smoothly over hips without cracking",
      "Extra-long corrosion resistant ring-shank nails",
      "Clean finishing touch for maximum visual curb appeal"
    ],
    installationConsiderations: "Must be installed facing away from prevailing storm wind directions to prevent wind-driven rain penetration under overlap.",
    specs: "GAF Timbertex / CertainTeed Shadow Ridge",
    color: "#F59E0B"
  },
  {
    id: "layer-ventilation",
    number: 7,
    name: "Ridge Ventilation System",
    subtitle: "Exhaust Airflow Regulator",
    purpose: "Allows trapped heat and humidity to escape continuously from the peak of the attic, protecting shingle life and lowering AC bills.",
    benefits: [
      "Continuous airflow exhaust without unsightly box vents",
      "Internal baffles prevent wind-driven rain or snow entry",
      "Low profile hidden beneath ridge cap shingles",
      "Maintains balanced attic temperature year-round"
    ],
    installationConsiderations: "Installed over a continuous 2-inch slot cut through decking on either side of the ridge beam; must match calculated soffit intake airflow.",
    specs: "GAF Cobra Ridge Vent / Air Vent ShingleVent II",
    color: "#64748B"
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "How much does a new roof cost?",
    answer: "Costs depend on total square footage (measured in 'roofing squares' of 100 sq ft), roof pitch, story height, tear-off requirements, and material chosen. Architectural Asphalt Shingles typically range from $400 to $550 per square installed. Standing Seam Metal ranges from $800 to $1,200 per square. Spanish Tile and Slate are premium materials ranging from $1,200 to $1,800+ per square. Use our interactive Cost Estimator for an immediate indicative calculation.",
    category: "Pricing & Inspection"
  },
  {
    question: "How long does roof replacement take?",
    answer: "For a standard residential home (2,000 to 3,500 sq ft), our experienced, OSHA-certified crews complete the full tear-off and replacement in 1 to 2 business days. Specialty installations like Standing Seam Metal, Spanish Clay Tile, or Slate typically take 3 to 5 days. We perform a continuous magnetic sweep of your lawn, gardens, and driveway before leaving each day.",
    category: "General"
  },
  {
    question: "How do I know if my roof needs replacement?",
    answer: "Common indicators include shingles that are curling, cupping, or missing entirely; bald patches where mineral granules have washed into gutters; dark water stains on your attic rafters or ceilings; sagging rooflines; or if your roof is over 20 years old. An Appy drone-assisted 21-point inspection can verify the remaining structural life of your roof.",
    category: "General"
  },
  {
    question: "Do you provide free roof inspections?",
    answer: "Yes! For residential homeowners within our designated service areas, our 21-point digital roof inspection—including high-resolution 4K drone photography and an attic thermal moisture scan—is 100% free with no obligation to purchase. We provide a complete written assessment report for your records.",
    category: "Pricing & Inspection"
  },
  {
    question: "What roofing materials are available?",
    answer: "We offer Architectural Asphalt Shingles (GAF, CertainTeed, Owens Corning), 24-Gauge Standing Seam Metal, Spanish Clay & Concrete Tile, Quarried Natural Slate, and Commercial Flat Roof Membranes (TPO, PVC, EPDM, Modified Bitumen). Explore them interactively in our 3D House Visualizer.",
    category: "Materials & Longevity"
  },
  {
    question: "Can storm damage be repaired?",
    answer: "Yes! Isolated wind or hail damage can often be repaired if the surrounding shingle seal tabs remain intact and decking moisture levels are safe. If widespread hail bruising or continuous tab uplift has compromised the roof mat, our specialists assist with complete insurance claim replacement.",
    category: "Storm & Insurance"
  },
  {
    question: "Do you offer financing?",
    answer: "Yes, we partner with leading home improvement lenders to provide flexible monthly payment options ranging from 12 to 120 months, with competitive promotional APRs and $0 down payment availability upon credit approval.",
    category: "Pricing & Inspection"
  },
  {
    question: "Are your roofing services insured?",
    answer: "Yes. Appy Roofing Co. maintains $2,000,000 in comprehensive General Liability insurance plus full Workers' Compensation coverage on every crew member. You are never held liable for jobsite accidents or material staging.",
    category: "General"
  },
  {
    question: "What warranties are available?",
    answer: "Appy provides dual-layer warranty protection: 1. Manufacturer Warranties: As a certified installer for top brands (GAF, CertainTeed, Owens Corning), we offer up to 50-Year Non-Prorated material warranties. 2. Appy Workmanship Warranty: We back our labor with an exclusive 10-Year to Lifetime Workmanship Guarantee covering any installation defects.",
    category: "Materials & Longevity"
  },
  {
    question: "How can I schedule an inspection?",
    answer: "You can schedule online in 60 seconds through our interactive booking calendar, enter your ZIP code in our Quick Estimate tool, or call our 24/7 client dispatch directly at (800) 555-APPY.",
    category: "Pricing & Inspection"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Marcus Vance",
    role: "Senior Project Estimator & Drone Pilot",
    certifications: ["FAA Part 107 Commercial Drone Pilot", "HAAG Certified Residential Inspector (HCI-R)", "OSHA 30"],
    experience: "16 Years in US Roofing & Construction",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    bio: "Marcus oversees forensic roof assessments, thermal moisture scanning, and precise blueprint takeoff estimates with extreme attention to structural detail."
  },
  {
    name: "Carlos Mendez",
    role: "Master Craftsman & Crew Foreman",
    certifications: ["CertainTeed Master Shingle Applicator", "GAF Master Elite Certified", "Fall Protection Competent Person"],
    experience: "19 Years in Standing Seam & Tile",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
    bio: "Carlos leads on-site installation crews, ensuring safety compliance, laser-straight ridge alignment, and spotless post-project magnetic sweeps."
  },
  {
    name: "David Ramirez",
    role: "Storm Restoration & Insurance Specialist",
    certifications: ["Xactimate Level 3 Certified", "Wind & Hail Damage Specialist", "OSHA 10 Safety"],
    experience: "12 Years in Storm Insurance Restoration",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "David works directly with homeowners and insurance adjusters to ensure every damaged shingle, gutter, and piece of siding is properly identified and approved."
  },
  {
    name: "Sarah Lindqvist",
    role: "Director of Quality Control & Safety",
    certifications: ["OSHA 500 Certified Trainer", "NRCA Quality Construction Manager", "First Aid / CPR Certified"],
    experience: "14 Years in Construction Safety",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "Sarah ensures strict 100% tie-off safety harness compliance on every project, conducting unannounced site inspections to guarantee zero defects."
  }
];

export const PROJECT_GALLERY: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Standing Seam Metal Upgrade",
    category: "Metal Roofing",
    location: "Highland Park, Dallas, TX",
    material: "24-Gauge Matte Charcoal Standing Seam",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
    details: "Replaced 24-year-old hail-damaged asphalt shingles with modern concealed-fastener 24-gauge standing seam metal. Lowered summer attic temps by 22°F."
  },
  {
    id: "proj-2",
    title: "Modern Suburban Shingle Replacement",
    category: "Roof Replacement",
    location: "Westlake Hills, Austin, TX",
    material: "CertainTeed Landmark Architectural Shingles (Weathered Wood)",
    year: "2026",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
    beforeImage: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
    details: "Tore off double-layer shingles down to decking. Installed new synthetic felt, valley ice & water barriers, and continuous ridge ventilation."
  },
  {
    id: "proj-3",
    title: "Post-Hailstorm Insurance Restoration",
    category: "Storm Restoration",
    location: "The Woodlands, Houston, TX",
    material: "GAF Timberline HDZ Class 4 Impact Rated",
    year: "2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    details: "Severe baseball hail damage restoration. Replaced 48 squares of shingles, 6 Velux skylights, and complete 6-inch seamless gutters."
  },
  {
    id: "proj-4",
    title: "Spanish Mission Barrel Tile Restoration",
    category: "New Installation",
    location: "Stone Oak, San Antonio, TX",
    material: "Handcrafted Terracotta Barrel Clay Tiles",
    year: "2026",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    details: "Precision historic restoration of cracked clay barrel tiles with dual-layer high-temperature underlayment and copper valley flashings."
  },
  {
    id: "proj-5",
    title: "Commercial Retail Center TPO Re-roof",
    category: "Commercial Roofing",
    location: "Fort Worth, TX",
    material: "60-mil White Carlisle SynTec TPO Membrane",
    year: "2026",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80",
    details: "Installed 32,000 sq ft of high-reflectivity TPO over polyiso insulation. Completed without interrupting retail tenant business."
  },
  {
    id: "proj-6",
    title: "Chimney Flashing & Valley Leak Repair",
    category: "Roof Repair",
    location: "Plano, TX",
    material: "Custom Copper Step Flashing & Ice Barrier",
    year: "2026",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
    details: "Repaired chronic 3-year leak around stone chimney. Rebuilt counter-flashing, installed self-adhering membrane, and replaced decayed decking."
  }
];

export const DEMO_STATISTICS = [
  { label: "Years of Experience", value: 18, suffix: "+", sub: "Serving Homeowners", isDemo: true },
  { label: "Projects Completed", value: 840, suffix: "+", sub: "Residential & Commercial", isDemo: true },
  { label: "Happy Customers", value: 795, suffix: "+", sub: "Verified Reviews", isDemo: true },
  { label: "Customer Satisfaction", value: 99.4, suffix: "%", sub: "Post-Job Audits", isDemo: true },
  { label: "Metro Service Hubs", value: 24, suffix: "+", sub: "Regional Corridors", isDemo: true }
];
