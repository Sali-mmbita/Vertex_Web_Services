import { ClientConfig } from '@/types/config';

// Default static fallback configuration (used during SSG build compile)
const defaultStaticConfig: ClientConfig = {
  "meta": {
    "name": "Elide Plumbing",
    "phone": "+254 717 631737",
    "phoneRaw": "+18005553569",
    "emergencyPhone": "+254 717 631737",
    "emergencyPhoneRaw": "+18009113569",
    "email": "message@domainname.com",
    "address": {
      "street": "00100-Nairobi-Kenya",
      "city": "Nairobi",
      "state": "Client Will State",
      "zip": "94301",
      "lat": 37.4419,
      "lng": -122.143,
      "serviceRadiusMiles": 25,
      "zipCodes": [
        "94301",
        "94302",
        "94303",
        "94304",
        "94306",
        "94025",
        "94040",
        "94043",
        "94085"
      ]
    },
    "licenseNumber": "#Kenya",
    "rating": 4.9,
    "reviewCount": 412,
    "establishedYear": 2022,
    "socialLinks": {
      "facebook": "https://facebook.com/vortexflow",
      "twitter": "https://twitter.com/vortexflow",
      "instagram": "https://instagram.com/vortexflow_plumbing",
      "yelp": "https://yelp.com/biz/vortexflow-plumbing",
      "google": "https://google.com/maps/vortexflow"
    },
    "logo": {
      "icon": "Activity",
      "primaryText": "ELIDE",
      "secondaryText": "PLUMBING"
    }
  },
  "theme": {
    "primaryAccent": "indigo",
    "secondaryAccent": "cyan",
    "glassmorphism": {
      "blur": "xl",
      "bgOpacity": 0.08,
      "borderOpacity": 0.12
    }
  },
  "services": [
    {
      "slug": "emergency-repairs",
      "title": "24/7 Rapid Emergency Response",
      "icon": "Flame",
      "category": "emergency",
      "shortDesc": "Burst pipes, active flooding, or catastrophic sewage backflows. Dispatched within 10 minutes.",
      "longDesc": "When a plumbing disaster strikes, every second of delay translates directly into property damage. Vortex Flow maintains a dedicated, fully staged fleet of rapid-response technicians operating 24 hours a day, 365 days a year. Our certified emergency plumbers arrive with advanced truck-mounted water extraction gear, heavy-duty pipe-clamping tools, and high-capacity pumps to instantly stabilize your home or business.",
      "basePrice": 250,
      "priceRange": "$250 - $650+",
      "benefits": [
        "Guaranteed arrival within 45 minutes or diagnostic fee is waived",
        "Advanced hydrostatic stabilization to halt active water damage instantly",
        "Comprehensive digital reporting for immediate homeowner insurance filing",
        "Fully stocked rolling warehouses for 1-visit resolution"
      ],
      "steps": [
        {
          "title": "Emergency Dispatch",
          "desc": "Our automated digital dispatch assigns the closest live tracking technician."
        },
        {
          "title": "Source Stabilization",
          "desc": "Upon arrival, our plumber identifies and isolates the master intake values."
        },
        {
          "title": "Surgical Repair",
          "desc": "Defective pipes, joints, or valves are cut out and replaced with surgical copper or PEX-a."
        },
        {
          "title": "Post-stabilization Test",
          "desc": "System-wide pressure-gauge testing ensures absolutely zero secondary leaks."
        }
      ],
      "faqs": [
        {
          "question": "What is considered a plumbing emergency?",
          "answer": "Any active flood, burst pipe, complete loss of water, sewer backup into living spaces, or absence of functional toilets in a single-bathroom home."
        },
        {
          "question": "Do you charge extra for holidays or weekends?",
          "answer": "We maintain flat emergency dispatch rates, with upfront pricing shown before any tool is lifted, regardless of the calendar day."
        }
      ],
      "subServices": [
        "Burst Pipe Repair",
        "Emergency Main Shutoff",
        "Water Extraction",
        "Sump Pump Failure Resolution"
      ],
      "image": "/images/emergency.jpg",
      "metaTitle": "24/7 Emergency Plumber Palo Alto | Burst Pipe Repair",
      "metaDesc": "Emergency plumbing issues? Vortex Flow provides 24/7 rapid emergency repair in Palo Alto and surrounding areas. Dispatched in minutes!"
    },
    {
      "slug": "leak-detection",
      "title": "Acoustic Ultrasonic Leak Detection",
      "icon": "Search",
      "category": "residential",
      "shortDesc": "Non-destructive thermal and acoustic scanning to pinpoint hidden slab and wall leaks.",
      "longDesc": "Hidden water leaks behind drywall or underneath concrete foundation slabs can silently rot your home framework. Vortex Flow utilizes non-invasive diagnostic techniques, including micro-acoustic vibration sensors, high-resolution thermal imaging cameras, and tracer gas analysis to pinpoint the exact centimeter of pipe failure without tearing down your walls.",
      "basePrice": 180,
      "priceRange": "$180 - $400",
      "benefits": [
        "100% non-destructive diagnostic methods preserving drywall and flooring",
        "State-of-the-art FLIR thermal mapping and acoustic sensor equipment",
        "Accurate pinpointing prevents unnecessary trenching or demolition",
        "Complimentary whole-house water pressure testing included"
      ],
      "steps": [
        {
          "title": "Thermal Scanning",
          "desc": "We inspect walls and slabs with infrared cameras to map anomalous temperature fields."
        },
        {
          "title": "Acoustic Mapping",
          "desc": "Micro-acoustic sensors track high-frequency vibrations caused by micro-fractured pipes."
        },
        {
          "title": "Gas Infiltration",
          "desc": "Safe tracer gas is injected to detect ultra-fine structural pinholes if acoustic lines are obstructed."
        },
        {
          "title": "Surgical Marking",
          "desc": "We flag the exact leak coordinates, presenting a fixed restoration proposal."
        }
      ],
      "faqs": [
        {
          "question": "How do I know if I have a hidden leak?",
          "answer": "Common warning signs include unexplained surges in your water utility bill, hot spots on your flooring, structural dampness, or a spinning water meter when all taps are off."
        },
        {
          "question": "Does insurance cover leak detection?",
          "answer": "Most homeowners insurance policies cover the cost of locating slab and pipe leaks when performed by a licensed contractor."
        }
      ],
      "subServices": [
        "Slab Leak Profiling",
        "Drywall Cavity Scans",
        "Underground Line Tracking",
        "Micro-Pressure Testing"
      ],
      "image": "/images/leak-detection.jpg",
      "metaTitle": "Slab Leak & Hidden Pipe Detection | Vortex Flow Plumbing",
      "metaDesc": "Pinpoint hidden leaks without demolition. Our acoustic and thermal scanners find slab and wall leaks with sub-millimeter accuracy."
    },
    {
      "slug": "drain-cleaning",
      "title": "Hydro-Jetting & Drain Descaling",
      "icon": "Wind",
      "category": "residential",
      "shortDesc": "High-pressure water jet scouring at 4000 PSI to restore pipelines to pristine internal condition.",
      "longDesc": "Chemical drain cleaners corrode pipes and only burn small holes through blockages. Vortex Flow uses hydro-jetting, sending high-pressure water streams scoured at up to 4,000 PSI through heavy-duty industrial hoses. This clears hair, solid fats, mineral scaling, and tree roots, polishing the internal pipe walls to a brand-new slick state.",
      "basePrice": 150,
      "priceRange": "$150 - $450",
      "benefits": [
        "Total pipe clearing back to original structural inner diameter",
        "Completely chemical-free, keeping municipal water systems safe",
        "Includes pre- and post-service HD fiber-optic camera inspection",
        "Prevents future waste accumulation by stripping grease and scale"
      ],
      "steps": [
        {
          "title": "Fiber-Optic Scope",
          "desc": "We run a high-definition flexible camera to diagnose the blockages structural makeup."
        },
        {
          "title": "Hydro-Jet Calibrated Run",
          "desc": "A custom rotational head-piece is configured for the pipes size and material composition."
        },
        {
          "title": "Scouring Process",
          "desc": "Water scours the pipe, breaking up grease deposits, calcified blockages, and tree roots."
        },
        {
          "title": "Final Inspection",
          "desc": "A follow-up video scan verifies pristine, obstruction-free lines."
        }
      ],
      "faqs": [
        {
          "question": "Is hydro-jetting safe for old pipes?",
          "answer": "Yes, when calibrated properly. We conduct video inspections beforehand to evaluate structural integrity and adjust water pressure accordingly."
        },
        {
          "question": "How often should drains be hydro-jetted?",
          "answer": "For standard residential homes, every 2-3 years prevents critical blockages. High-volume commercial kitchens benefit from quarterly service."
        }
      ],
      "subServices": [
        "Main Sewer Line Clearing",
        "Kitchen Grease Descaling",
        "Root Infiltration Cutting",
        "HD Video Sewer Scans"
      ],
      "image": "/images/drain-cleaning.jpg",
      "metaTitle": "Sewer Line Hydro-Jetting & Drain Cleaning Palo Alto",
      "metaDesc": "Restore your pipes to brand-new condition. Vortex Flow provides 4000 PSI hydro-jetting and digital sewer camera inspections."
    },
    {
      "slug": "water-heaters",
      "title": "Smart Tankless Water Heaters",
      "icon": "Zap",
      "category": "residential",
      "shortDesc": "Ultra-efficient, space-saving tankless water heaters delivering endless hot water on demand.",
      "longDesc": "Traditional water heaters constantly burn energy to keep 50 gallons of water hot in an idle tank. Vortex Flow specializes in installing premium, smart tankless water heaters that instantly flash-heat water only when you turn on a tap. These systems save up to 40% in energy costs, fit compactly on any wall, and provide an endless supply of hot water.",
      "basePrice": 450,
      "priceRange": "$450 - $3200",
      "benefits": [
        "Never run out of hot water, regardless of consecutive appliance runs",
        "Up to 40% reduction in utility bills through smart thermal modulation",
        "Unlocks valuable indoor square footage by replacing massive tanks",
        "Extended lifespans of 20+ years compared to 8-10 years for tanks"
      ],
      "steps": [
        {
          "title": "Load Assessment",
          "desc": "We calculate peak water demand and flow requirements across all fixtures."
        },
        {
          "title": "System Decommissioning",
          "desc": "Old leaking tanks are drained, disconnected, and recycled sustainably."
        },
        {
          "title": "Manifold Installation",
          "desc": "We run high-volume gas lines or heavy-gauge electrical circuits to feed the heat exchangers."
        },
        {
          "title": "Wall Mounting & Calibration",
          "desc": "The tankless module is mounted, plumbed with bypass valves, and calibrated for flow."
        }
      ],
      "faqs": [
        {
          "question": "What is the cost difference between tank and tankless?",
          "answer": "While tankless heaters have a higher upfront cost, their double-length lifespan, high energy savings, and available tax rebates yield a full return on investment within 4-5 years."
        },
        {
          "question": "How much maintenance do tankless heaters require?",
          "answer": "An annual flushing is recommended to clear scale deposits and keep the heat exchangers operating at 99% thermal efficiency."
        }
      ],
      "subServices": [
        "Tankless Conversion",
        "Traditional Water Heaters",
        "Recirculating Pump Setup",
        "Anode Rod Replacement"
      ],
      "image": "/images/water-heater.jpg",
      "metaTitle": "Tankless Water Heater Installation | Vortex Flow",
      "metaDesc": "Never run out of hot water again. Convert to a smart, ultra-efficient tankless water heater with Vortex Flow. Free estimates!"
    },
    {
      "slug": "sewer-line",
      "title": "Trenchless Sewer Pipe Restoration",
      "icon": "Shield",
      "category": "residential",
      "shortDesc": "Rebuild damaged underground pipelines from the inside out using structural epoxy sleeve lining.",
      "longDesc": "Historically, fixing a broken sewer pipe meant trenching through your driveway, lawn, and landscaping. Vortex Flow offers trenchless Cured-In-Place Pipe (CIPP) restoration. We insert a flexible, epoxy-saturated structural sleeve into your existing pipeline through a single entry point, inflate it, and cure it into a bulletproof, joint-free structural pipe with a 50-year warranty.",
      "basePrice": 1200,
      "priceRange": "$1200 - $6500",
      "benefits": [
        "Preserves mature landscaping, manicured lawns, and paved driveways",
        "Saves thousands in secondary concrete restoration costs",
        "Seamless joint-free epoxy sleeve prevents all future root entry",
        "Meets and exceeds ASTM standards for heavy structural loads"
      ],
      "steps": [
        {
          "title": "Sewer Inspection",
          "desc": "Digital scoping locates cracks, offset joints, or root intrusions."
        },
        {
          "title": "Pipe Prep & Descaling",
          "desc": "Drains are hydro-jetted clean to allow structural epoxy bonding."
        },
        {
          "title": "Epoxy Liner Insertion",
          "desc": "An epoxy-saturated felt tube is blown or pulled into the damaged pipeline."
        },
        {
          "title": "Pneumatic Curing",
          "desc": "The liner is inflated pneumatically and cured, forming a seamless pipe."
        }
      ],
      "faqs": [
        {
          "question": "What is CIPP lining, and how long does it last?",
          "answer": "Cured-In-Place Pipe is an advanced resin sleeve that cures into a structural pipe inside your old lines. It is rated to last 50+ years."
        },
        {
          "question": "Is trenchless always possible?",
          "answer": "Trenchless is viable for 90% of cases, provided the original pipe has not completely collapsed and blocked the insertion paths."
        }
      ],
      "subServices": [
        "CIPP Epoxy Pipe Lining",
        "Pipe Bursting Replacement",
        "Sewer Cleanout Installs",
        "Camera Line Mapping"
      ],
      "image": "/images/sewer.jpg",
      "metaTitle": "Trenchless Sewer Pipe Repair & Epoxy Lining Palo Alto",
      "metaDesc": "Repair broken underground sewer pipes without digging up your yard. Vortex Flow structural CIPP lining features a 50-year warranty."
    },
    {
      "slug": "commercial-plumbing",
      "title": "Commercial Facilities & Backflow Management",
      "icon": "Briefcase",
      "category": "commercial",
      "shortDesc": "Engineered commercial plumbing, annual backflow testing, and heavy-duty grease trap management.",
      "longDesc": "Commercial buildings require specialized hydraulic engineering. Vortex Flow designs, installs, and maintains massive plumbing frameworks, including multi-story drain stacks, commercial booster pumps, industrial water heating grids, certified backflow prevention systems, and high-capacity grease trap interceptors to keep your enterprise in compliance with municipal building codes.",
      "basePrice": 300,
      "priceRange": "$300 - $5000+",
      "benefits": [
        "Certified backflow testing, certified state reporting, and automated reminders",
        "Staged off-hours execution to minimize or prevent business downtime",
        "Detailed digital hydraulic blueprints and compliance logging",
        "Dedicated account executives and priority emergency dispatch contracts"
      ],
      "steps": [
        {
          "title": "Facility Audit",
          "desc": "Our commercial engineer maps out water inlets, drains, grease traps, and interceptors."
        },
        {
          "title": "Hydraulic Calculations",
          "desc": "Flow velocity, volume loads, and pressure drops are modeled mathematically."
        },
        {
          "title": "Implementation Plan",
          "desc": "Phased, off-hours execution keeps business doors open during upgrades."
        },
        {
          "title": "Compliance Submission",
          "desc": "All tests, specifications, and stamps are logged directly with municipal inspectors."
        }
      ],
      "faqs": [
        {
          "question": "Why is annual backflow testing required?",
          "answer": "Backflow assemblies prevent polluted water from back-siphoning into the public clean drinking supply. Local water districts mandate testing annually."
        },
        {
          "question": "Do you offer preventative maintenance agreements?",
          "answer": "Yes, we provide custom contracts for commercial properties including quarterly grease trap audits, hydro-jetting, and booster checks."
        }
      ],
      "subServices": [
        "Certified Backflow Prevention",
        "Grease Trap Interceptor Maintenance",
        "Multi-Story Water Systems",
        "Booster Pump Calibration"
      ],
      "image": "/images/commercial.jpg",
      "metaTitle": "Commercial Plumbing & Backflow Testing | Vortex Flow",
      "metaDesc": "Professional commercial plumbing services in Palo Alto. Certified backflow testers, emergency commercial dispatch, and preventative packages."
    }
  ],
  "pricing": {
    "baseRates": {
      "emergency-repairs": 250,
      "leak-detection": 180,
      "drain-cleaning": 150,
      "water-heaters": 450,
      "sewer-line": 1200,
      "commercial-plumbing": 300
    },
    "propertyMultipliers": [
      {
        "label": "Residential Condo/Appt",
        "value": "apartment",
        "multiplier": 0.95
      },
      {
        "label": "Single Family Residential",
        "value": "residential",
        "multiplier": 1
      },
      {
        "label": "Large Estate / Multi-Story Home",
        "value": "estate",
        "multiplier": 1.15
      },
      {
        "label": "Light Commercial Facility",
        "value": "commercial-light",
        "multiplier": 1.3
      },
      {
        "label": "Industrial / Corporate Campus",
        "value": "commercial-heavy",
        "multiplier": 1.6
      }
    ],
    "urgencyFactors": [
      {
        "label": "Routine (Next 3-5 Business Days)",
        "value": "routine",
        "multiplier": 1,
        "fee": 0
      },
      {
        "label": "Priority Dispatch (Within 24 Hours)",
        "value": "priority",
        "multiplier": 1.1,
        "fee": 49
      },
      {
        "label": "Emergency Response (Immediate, Under 45 Mins)",
        "value": "emergency",
        "multiplier": 1.25,
        "fee": 149
      }
    ],
    "addOnOptions": [
      {
        "label": "Felt Filter & Pipe Guard Installation",
        "value": "filter",
        "price": 95,
        "desc": "Adds mesh filters to structural points to trap waste particles."
      },
      {
        "label": "HD Sewer Camera Recording Link",
        "value": "recording",
        "price": 45,
        "desc": "Receives a downloadable high-definition file and analysis report."
      },
      {
        "label": "Extended 3-Year Service Warranty",
        "value": "warranty",
        "price": 120,
        "desc": "Increases standard coverage on labor and materials to 3 full years."
      },
      {
        "label": "Eco-Flow Low Consumption Calibrator",
        "value": "ecoflow",
        "price": 75,
        "desc": "Sets precision flow restrictors to cut water volume by 15-20%."
      }
    ]
  },
  "faqs": [
    {
      "category": "General",
      "question": "Are your plumbers licensed, bonded, and insured?",
      "answer": "Yes, Vortex Flow holds a valid California C-36 plumbing license (CSLB #984210). Every technician on our team is fully bonded and carries up to $5M in general liability insurance to ensure complete protection for your property."
    },
    {
      "category": "Pricing",
      "question": "Do you charge by the hour or provide flat-rate pricing?",
      "answer": "We operate on flat-rate pricing. After conducting a diagnostic inspection, we present written, fixed-price options before any work begins. This means the price we quote is the exact price you pay, with no unexpected hourly overages."
    },
    {
      "category": "Emergency",
      "question": "How quickly can you respond to an emergency plumbing call?",
      "answer": "Our average emergency response time in Palo Alto and surrounding cities is under 45 minutes. Our rolling fleet tracks traffic dynamically and is routed via GPS dispatch."
    },
    {
      "category": "Services",
      "question": "What warranties do you provide on plumbing work?",
      "answer": "We provide a 1-year guarantee on labor and installation. Extended warranties of up to 3 years are available. For sewer repairs and lining, we pass on the manufacture warranties and offer up to a 50-year structural warranty."
    },
    {
      "category": "Services",
      "question": "How long does a typical tankless water heater installation take?",
      "answer": "A standard tank-to-tankless conversion takes roughly 4 to 6 hours to execute, which includes running code-compliant venting, gas lines, water lines, mounting the unit, and performing safety testing."
    }
  ],
  "blog": [
    {
      "slug": "signs-slab-leak-foundation",
      "title": "5 Warning Signs You Have a Hidden Slab Leak Under Your Foundation",
      "excerpt": "Underground slab leaks are silent home destroyers. Learn the diagnostic signs to spot them before you suffer severe structural failure.",
      "content": [
        "A slab leak is a plumbing failure that occurs in the copper or PEX supply lines running underneath your homes concrete foundation. Because these pipes are encased in concrete and buried in soil, a leak can flow unchecked for months before presenting obvious visual symptoms.",
        "1. Unexplained Spikes in Your Water Bill: If your water habits have not changed but your monthly utility bill has jumped 20% or more, pressurized water is likely escaping somewhere under your foundation.",
        "2. Warm Spots on the Floor: Hot water lines running under concrete transfer heat upward. If you notice a specific patch of your tile, hardwood, or carpet feels unusually warm, it indicates a hot-water line rupture beneath.",
        "3. Damp Flooring or Moldy Baseboards: In advanced stages, escaping water pools under the concrete and begins wicking upward through carpet backing, tile grout, or drywall baseboards, resulting in musty smells and spores.",
        "4. Low Water Pressure: If you experience a sudden drop in water pressure across all household fixtures, a portion of your incoming flow is dumping directly into the dirt sub-base.",
        "5. The Water Meter Never Stops Spinning: Turn off every tap in your house. Go look at your water meter out by the street. If the micro-dial or digital counter is still advancing, water is leaking, and acoustic ultrasound scanning is required."
      ],
      "author": {
        "name": "Marcus Thorne",
        "role": "Master Diagnostic Plumber",
        "avatar": "/images/team-marcus.jpg"
      },
      "date": "July 15, 2026",
      "category": "Diagnostics",
      "readTime": "5 min read",
      "image": "/images/blog/slab-leak.jpg",
      "tags": [
        "Slab Leaks",
        "Diagnostics",
        "Home Maintenance"
      ],
      "relatedSlugs": [
        "how-ultrasonic-leak-detection-saves-drywall"
      ],
      "metaTitle": "5 Warning Signs of a Foundation Slab Leak | Vortex Flow",
      "metaDesc": "Spot foundation slab leaks before they destroy your home. Learn the 5 main warning signs including hot floors, water bill spikes, and spinning meters."
    },
    {
      "slug": "how-ultrasonic-leak-detection-saves-drywall",
      "title": "Acoustic Ultrasonic Leak Detection vs. Traditional Demolition Diagnostics",
      "excerpt": "Why tear down drywall to find a leak? Discover how acoustic sensors and thermal scanners pinpoint plumbing issues without leaving a scratch.",
      "content": [
        "Historically, when a plumber suspected a leak behind a wall or ceiling, the diagnostic method was crude: smash a hole in the drywall, look inside, and repeat until the wet pipe was found. This left homeowners with massive reconstruction costs on top of the plumbing repair bills.",
        "Acoustic ultrasonic leak detection has revolutionized home diagnostics. Because water under pressure makes a distinct high-frequency vibration when escaping a tiny pipe rupture, specialized ground-microphones can amplify and map these acoustic patterns.",
        "By matching ultrasonic vibration analysis with FLIR thermal imaging cameras, modern plumbers can see through solid drywall, concrete slabs, and brick siding. Thermal sensors register the temperature differential where moisture pools, while acoustic sensors track the exact point of the micro-vibration.",
        "The benefit? Instead of tearing down an entire 15-foot drywall hallway, Vortex Flow technicians make a tiny, surgical 4x4-inch incision directly over the leak, patch the pipe in under an hour, and seal the wall. This saves thousands of dollars in drywall mudding, framing, and repainting costs."
      ],
      "author": {
        "name": "Marcus Thorne",
        "role": "Master Diagnostic Plumber",
        "avatar": "/images/team-marcus.jpg"
      },
      "date": "June 28, 2026",
      "category": "Technology",
      "readTime": "4 min read",
      "image": "/images/blog/acoustic-tech.jpg",
      "tags": [
        "Leak Detection",
        "Ultrasonic Technology",
        "Surgical Plumb"
      ],
      "relatedSlugs": [
        "signs-slab-leak-foundation"
      ],
      "metaTitle": "Acoustic Leak Detection vs Demolition | Vortex Flow",
      "metaDesc": "Discover the advanced technology of acoustic ultrasonic leak detection. Avoid structural destruction and pinpoint pipe failures surgically."
    }
  ],
  "careers": [
    {
      "id": "diagnostic-technician",
      "title": "Lead Ultrasonic Diagnostic Plumber",
      "department": "Field Operations",
      "location": "Palo Alto, CA",
      "type": "Full-time",
      "salaryRange": "$95,000 - $130,000 / year + commissions",
      "description": "We are seeking an experienced Leak Detection Specialist skilled in operating acoustic microphones, infrared heat cameras, and tracer gas rigs. This role represents the elite tier of our diagnostic dispatch team.",
      "requirements": [
        "Minimum of 5 years of licensed residential plumbing experience",
        "Valid CA C-36 license or equivalent Journeyman certificate",
        "Proven expertise with FLIR thermal cameras and ultrasonic sensors",
        "Clean driving record and passing background checks"
      ],
      "benefits": [
        "Fully paid medical, dental, and vision insurance premiums",
        "Brand-new, take-home fully equipped Mercedes Sprinter tech-van",
        "State-of-the-art diagnostic equipment supplied at zero cost to you",
        "401(k) retirement matching up to 5% with immediate vesting"
      ]
    },
    {
      "id": "service-technician",
      "title": "Commercial Hydraulic Specialist",
      "department": "Commercial Division",
      "location": "Silicon Valley Area",
      "type": "Full-time",
      "salaryRange": "$105,000 - $145,000 / year",
      "description": "Vortex Flow is expanding its commercial contract division. We need a Master Plumber capable of managing high-flow booster pumps, multi-story sanitary line stacks, and commercial backflow prevention loops.",
      "requirements": [
        "8+ years in commercial construction or facility plumbing maintenance",
        "Active California AWWA Backflow Tester certification is mandatory",
        "Expert reading of dynamic architectural water blueprints",
        "Strong leadership skills to supervise junior apprentices"
      ],
      "benefits": [
        "Premium salary packages with structured annual raises",
        "Flexible schedules with primary weekday operations",
        "Professional tool allowance and ongoing education sponsorships",
        "Profit-sharing and performance milestone bonuses"
      ]
    }
  ],
  "testimonials": [
    {
      "id": "t-1",
      "author": "Sarah Jenkins",
      "role": "Palo Alto Resident",
      "text": "A burst pipe on a Saturday morning was our worst nightmare. Vortex Flow had a plumber at our door in 32 minutes flat. He cut out the rusted pipe, put in PEX, and cleaned up the entire utility room. The flat pricing meant no hourly surprise fees.",
      "rating": 5,
      "source": "Google",
      "date": "May 14, 2026",
      "avatar": "/images/testimonials/avatar-1.jpg"
    },
    {
      "id": "t-2",
      "author": "David Chen",
      "role": "Property Developer, Chen Real Estate",
      "text": "We had a mystery underground leak under our concrete lobby slab. Another plumber wanted to trench the entire floor. Vortex Flow came in with ultrasonic audio sensors and found the leak was contained to a single elbow joint in the back corner. Unbelievable tech and immense savings.",
      "rating": 5,
      "source": "Verified",
      "date": "April 22, 2026",
      "avatar": "/images/testimonials/avatar-2.jpg"
    },
    {
      "id": "t-3",
      "author": "Linda Montgomery",
      "role": "Executive Chef, Blue Oak Bistro",
      "text": "Commercial backflow compliance is a headache every year. Vortex Flow completed our full testing off-hours, submitted the certificates directly to the city water district, and let us operate without a minute of kitchen interruption. Highly recommended for commercial operations!",
      "rating": 5,
      "source": "Yelp",
      "date": "March 10, 2026",
      "avatar": "/images/testimonials/avatar-3.jpg"
    },
    {
      "id": "t-4",
      "author": "Elena Rostova",
      "role": "Homeowner",
      "text": "Upgraded to a smart tankless heater with Vortex Flow. Our gas bill dropped by $60 in the first month, and our four kids can take back-to-back showers without anyone getting cold. Extremely clean piping and beautiful workmanship.",
      "rating": 5,
      "source": "Google",
      "date": "February 15, 2026",
      "avatar": "/images/testimonials/avatar-4.jpg"
    }
  ],
  "gallery": [
    {
      "id": "g-1",
      "title": "Ultrasonic Slab Leak Localization",
      "category": "leak-detection",
      "description": "Concrete sub-floor leak mapped non-destructively, showing thermal imaging overlays vs. a clean surgical spot-repair.",
      "beforeImage": "/images/gallery/leak-before.jpg",
      "afterImage": "/images/gallery/leak-after.jpg"
    },
    {
      "id": "g-2",
      "title": "Residential Sewer Lining Rehabilitation",
      "category": "sewer-line",
      "description": "Main line showing root infiltration blockage, restored into a seamless structural CIPP epoxy tube without lawn excavation.",
      "beforeImage": "/images/gallery/sewer-before.jpg",
      "afterImage": "/images/gallery/sewer-after.jpg"
    },
    {
      "id": "g-3",
      "title": "Water Heater Tankless Conversion",
      "category": "water-heaters",
      "description": "Replacing a corroded 50-gallon metal tank with a wall-mounted dual-chamber smart condensing tankless heater.",
      "beforeImage": "/images/gallery/tank-before.jpg",
      "afterImage": "/images/gallery/tank-after.jpg"
    },
    {
      "id": "g-4",
      "title": "Commercial Backflow Assembly Overhaul",
      "category": "commercial-plumbing",
      "description": "Replacing a rusted 4-inch backflow prevention assembly with code-compliant brass loops and custom thermal insulation wrapping.",
      "beforeImage": "/images/gallery/backflow-before.jpg",
      "afterImage": "/images/gallery/backflow-after.jpg"
    }
  ],
  "pageContent": {
    "home": {
      "hero": {
        "badge": "Award-Winning Hydraulic Engineering",
        "title": "Precision Flow. Ultimate Reliability.",
        "subtitle": "Experience the future of home plumbing service. Ultrasonic diagnostics, high-pressure hydro-jetting, and seamless trenchless sewer restoration—backed by absolute upfront pricing.",
        "ctaPrimary": "Explore Estimator",
        "ctaSecondary": "Emergency Dispatch"
      },
      "metrics": [
        {
          "label": "Avg Dispatch Time",
          "value": "38 Min",
          "desc": "Real-time GPS fleet tracking"
        },
        {
          "label": "Structural Projects",
          "value": "4.8k+",
          "desc": "Executed to strict building codes"
        },
        {
          "label": "Customer Trust Rating",
          "value": "4.9★",
          "desc": "Based on 400+ certified reviews"
        },
        {
          "label": "Active Service Radius",
          "value": "25 Mi",
          "desc": "Deep regional coverage in Silicon Valley"
        }
      ]
    },
    "about": {
      "story": {
        "title": "Engineering Pristine Flows Since 2018",
        "paragraphs": [
          "Vortex Flow & Plumbing was founded in Palo Alto with a single mission: to elevate the home service experience to the highest standards of professional engineering. Traditional plumbing has been riddled with vague quotes, messy excavations, and reactive, short-term fixes. We envisioned a different path—one driven by micro-acoustic sensors, thermal diagnostics, and non-destructive repairs.",
          "Over the past eight years, we have grown into one of Silicon Valleys most decorated plumbing contractors. We invest heavily in training our technicians in advanced ultrasonic slab scanning and cured-in-place pipe (CIPP) lining technology, enabling us to preserve mature trees, paved driveways, and historical building structures for our clients.",
          "Today, our rolling smart vans act as mobile engineering hubs, ready to deliver residential restorations and commercial hydraulic overhauls. We combine top-tier software scheduling, GPS routing, and absolute transparency in pricing to respect your home, your time, and your budget."
        ],
        "image": "/images/about-story.jpg"
      },
      "values": [
        {
          "title": "Surgical Precision",
          "desc": "We prioritize non-invasive diagnostics. We scan, map, and pinpoint issues using infrared heat cameras and acoustics before we ever touch a hammer.",
          "icon": "Crosshair"
        },
        {
          "title": "Absolute Transparency",
          "desc": "We do not believe in hourly quotes or surprise bills. You receive flat, fixed pricing options in writing before we lift a single tool.",
          "icon": "Eye"
        },
        {
          "title": "Long-Term Durability",
          "desc": "We do not apply band-aids. We build for decades, utilizing heavy copper, seamless PEX-a, and epoxy linings backed by 50-year structural warranties.",
          "icon": "CheckCircle"
        }
      ],
      "timeline": [
        {
          "year": "2018",
          "title": "The Launch of Vortex Flow",
          "desc": "Founded in Palo Alto with two specialized diagnostic trucks focusing on non-invasive pipe scans."
        },
        {
          "year": "2020",
          "title": "Trenchless Expansion",
          "desc": "Introduced CIPP cured-in-place sewer liners, eliminating the need to tear up yards and driveways."
        },
        {
          "year": "2023",
          "title": "Commercial Contract Mastery",
          "desc": "Launched our dedicated commercial facility maintenance team, securing backflow certifications for 80+ companies."
        },
        {
          "year": "2026",
          "title": "Digital Estimate Launch",
          "desc": "Introduced our fully interactive digital pricing matrix, offering instant estimation options online."
        }
      ]
    },
    "careersPage": {
      "header": "Join the Vanguard of Hydraulic Engineering",
      "subHeader": "At Vortex Flow, we treat plumbing as an engineering discipline. Work with advanced thermal imaging cameras, ultrasonic diagnostic sensors, and state-of-the-art trenchless liners.",
      "benefitsTitle": "Industry-Defining Compensation & Support",
      "benefits": [
        {
          "title": "Elite Fleet Vehicles",
          "desc": "Take-home late-model Mercedes-Benz Sprinter vans fully equipped with high-end power tools and diagnostic scanners.",
          "icon": "Truck"
        },
        {
          "title": "Continual Education",
          "desc": "100% company-sponsored certifications including AWWA Backflow testing, CIPP lining mastery, and mechanical safety.",
          "icon": "GraduationCap"
        },
        {
          "title": "Uncompromising Safety",
          "desc": "Top-tier safety equipment, active harness monitors, and structured operations that respect your health and well-being.",
          "icon": "Heart"
        }
      ]
    }
  },
  "aiAssistant": {
    "enabled": true,
    "botName": "Vortex Gemini AI",
    "personalityTitle": "Lead Diagnostic Intelligence",
    "welcomeMessage": "Hi there! I am Vortex Gemini, your intelligent diagnostic plumbing assistant. How can I help you analyze a leak, check service rates, or optimize your plumbing flow today? 💧",
    "fallbackResponse": "💡 That sounds like a specialized job for our master field engineers! I recommend calling our diagnostic dispatcher directly at (650) 555-FLOW for an immediate booking, or let me know if you would like to discuss our 50-year CIPP sewer liner warranty or run our dynamic cost estimator!",
    "knowledgeBase": [
      {
        "keywords": [
          "leak",
          "detection",
          "locate",
          "acoustic",
          "scan",
          "scanning",
          "slab"
        ],
        "response": "🔍 **Acoustic & Ultrasonic Leak Diagnostics**:\nWe utilize state-of-the-art non-invasive acoustic sensors and thermal heat mapping to surgically pinpoint underground or sub-slab leaks down to the centimeter without exploratory demolition!\n\n*   **How it works:** Our rolling service rig deploys micro-frequency ground microphones to register structural pipe vibrations.\n*   **Next step:** Go to our **Leak Detection** services page or enter your ZIP code in our Coverage Map to dispatch a scanning truck!"
      },
      {
        "keywords": [
          "price",
          "cost",
          "quote",
          "estimate",
          "how much",
          "rates"
        ],
        "response": "💰 **Transparent, Flat-Rate Pricing**:\nWe strictly reject hourly pricing or surprise extra fees! All pricing is upfront and structured.\n\n*   **Dynamic Calculator:** You can run our **Interactive Cost Estimator** on the home page or Quote page for an instant, customized quote range!\n*   **Service call:** Standard diagnostic service calls to dispatch a truck and provide a written estimate on-site are flat-rate."
      },
      {
        "keywords": [
          "emergency",
          "flood",
          "burst",
          "pipe",
          "rupture",
          "urgent",
          "now",
          "night",
          "24/7"
        ],
        "response": "🚨 **EMERGENCY DISPATCH INITIATED**:\nWe maintain fully loaded diagnostic service vans on active staging standby 24 hours a day, 7 days a week!\n\n*   **Dispatch ETA:** Typically under **45 minutes** for Silicon Valley regions!\n*   **Action Required:** Please dial our active emergency hotline **(650) 555-9111** immediately to speak directly to a live dispatcher and launch a truck."
      },
      {
        "keywords": [
          "clog",
          "drain",
          "jetting",
          "sewer",
          "trenchless",
          "lining",
          "cipp",
          "pipe",
          "liner"
        ],
        "response": "💧 **Trenchless Sewer & Drain Engineering**:\nWe are Silicon Valley's premier provider of cured-in-place pipe (CIPP) lining, restoring broken pipelines entirely from the inside out without excavation!\n\n*   **No Digging:** We utilize clean access points to insert and cure an epoxy sleeve, preserving your lawn and paved driveway.\n*   **Unmatched Warranty:** All of our structural CIPP sewer liners come with an elite **50-year warranty**!\n*   **Root Blockages:** For severe clogs, we deploy high-pressure hydro-jetting to completely scour roots and debris."
      },
      {
        "keywords": [
          "hello",
          "hi",
          "hey",
          "greetings",
          "who are you",
          "bot"
        ],
        "response": "👋 Hello! I am **Vortex Gemini**, your intelligent field diagnostics assistant.\n\nI can answer technical questions regarding:\n*   🔍 *Acoustic Leak Scanning*\n*   💧 *Trenchless Sewer CIPP Lining (50-Yr Warranty!)*\n*   💰 *Upfront Estimates & Financing*\n*   🚨 *Emergency 24/7 Truck Dispatch ETAs*"
      },
      {
        "keywords": [
          "warranty",
          "guarantee",
          "repair",
          "years"
        ],
        "response": "🛡️ **Double-Down Guarantees**:\nWe build for decades and stand behind every single hydraulic installation:\n\n*   **CIPP Sewer Liners:** Covered by an elite **50-year structural warranty**.\n*   **Standard Repairs:** Backed by our full 1-year parts and labor craftsmanship guarantee.\n*   **Absolute Satisfaction:** If our repair doesn't hold, we return and fix it for free!"
      }
    ]
  }
};

// Reactively load and merge local storage customizations if running inside the browser
export const clientConfig: ClientConfig = (() => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('vortex-custom-config');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse customized local config:', e);
      }
    }
  }
  return defaultStaticConfig;
})();
