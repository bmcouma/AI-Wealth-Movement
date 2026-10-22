import { AITool, PromptItem, AIJob, GisResource, LearningCourse } from '../types';

export const TOOLS_DATA: AITool[] = [
  {
    id: 'tool-1',
    name: 'QGIS with Semi-Automatic Classification Plugin (SCP)',
    category: 'GIS & Spatial',
    description: 'Open-source GIS desktop environment paired with machine learning classification for multi-spectral remote sensing imagery.',
    detailedSpecs: 'Supports supervised classification algorithms (Minimum Distance, Maximum Likelihood, Random Forest). Direct ingestion of Sentinel-2, Landsat 8/9, and ASTER data with automated atmospheric correction (DOS1).',
    pricing: 'Free',
    isBeginnerFriendly: false,
    featured: true,
    tags: ['Remote Sensing', 'Satellite Imagery', 'Open Source', 'Land Cover'],
    url: 'https://qgis.org'
  },
  {
    id: 'tool-2',
    name: 'Claude by Anthropic',
    category: 'Productivity',
    description: 'Advanced AI assistant optimized for complex code refactoring, document synthesis, and nuanced multi-turn analytical reasoning.',
    detailedSpecs: 'Offers 200k+ token context windows, Artifacts live rendering, structured XML/JSON outputs, and superior code generation for Python, TypeScript, and SQL.',
    pricing: 'Freemium',
    isBeginnerFriendly: true,
    featured: true,
    tags: ['LLM', 'Analysis', 'Coding', 'Research'],
    url: 'https://claude.ai'
  },
  {
    id: 'tool-3',
    name: 'Google Earth Engine',
    category: 'GIS & Spatial',
    description: 'Petabyte-scale catalog of planetary satellite data combined with an API for geospatial analysis and planetary-scale tracking.',
    detailedSpecs: 'High-performance cloud computing backend hosting 40+ years of historical earth observation data. Accessible via JavaScript Playground and Python earthengine-api.',
    pricing: 'Freemium',
    isBeginnerFriendly: false,
    featured: true,
    tags: ['Cloud GIS', 'Earth Observation', 'Big Data', 'Climate'],
    url: 'https://earthengine.google.com'
  },
  {
    id: 'tool-4',
    name: 'Cursor AI Code Editor',
    category: 'Coding',
    description: 'AI-first code editor built on VS Code with codebase indexing, intelligent multi-line predictive edits, and integrated terminal debug.',
    detailedSpecs: 'Features Composer multi-file agentic generation, custom @Codebase vector indexing, and seamless switching between frontier reasoning models.',
    pricing: 'Freemium',
    isBeginnerFriendly: true,
    featured: true,
    tags: ['IDE', 'Developer Tools', 'Copilot', 'TypeScript'],
    url: 'https://cursor.com'
  },
  {
    id: 'tool-5',
    name: 'Make (formerly Integromat)',
    category: 'Automation',
    description: 'Visual no-code automation platform with native AI blocks to link OpenAI, webhooks, Airtable, and custom data pipelines.',
    detailedSpecs: 'Visual drag-and-drop scenario builder with error handling routes, webhook listeners, datastores, and native HTTP modules with OAuth 2.0 authentication.',
    pricing: 'Freemium',
    isBeginnerFriendly: true,
    featured: false,
    tags: ['Workflows', 'No-Code', 'Pipelines', 'API Integrations'],
    url: 'https://make.com'
  },
  {
    id: 'tool-6',
    name: 'GeoPandas & Rasterio',
    category: 'GIS & Spatial',
    description: 'Standard Python data science libraries for manipulating vector geospatial data and running array operations on GeoTIFF rasters.',
    detailedSpecs: 'Extends Pandas DataFrames to support Shapely geometry types, coordinate reference system (CRS) reprojections via Proj, and affine matrix transformations.',
    pricing: 'Free',
    isBeginnerFriendly: false,
    featured: false,
    tags: ['Python', 'Spatial ML', 'Open Source', 'Data Science'],
    url: 'https://geopandas.org'
  },
  {
    id: 'tool-7',
    name: 'Perplexity AI',
    category: 'Research',
    description: 'Conversational real-time research engine providing direct, verified source citations for academic, financial, and technical discovery.',
    detailedSpecs: 'Combines multi-engine web search with live page scraping, academic paper indexing, and grounded answer synthesis with clickable source annotations.',
    pricing: 'Freemium',
    isBeginnerFriendly: true,
    featured: true,
    tags: ['Search Engine', 'Research', 'Citations', 'Verification'],
    url: 'https://perplexity.ai'
  },
  {
    id: 'tool-8',
    name: 'v0 by Vercel',
    category: 'Coding',
    description: 'Generative UI system that creates modern React components and full application layouts from natural language prompts using Tailwind CSS.',
    detailedSpecs: 'Generates clean TypeScript/React code with Radix UI and Tailwind CSS. Supports live preview, iteration prompts, and direct npm CLI component export.',
    pricing: 'Freemium',
    isBeginnerFriendly: true,
    featured: false,
    tags: ['UI Generation', 'React', 'Tailwind', 'Frontend'],
    url: 'https://v0.dev'
  },
  {
    id: 'tool-9',
    name: 'ElevenLabs',
    category: 'Audio & Video',
    description: 'Industry-standard voice synthesis and speech cloning platform with emotional cadence control and multi-lingual voice generation.',
    detailedSpecs: 'Provides low-latency Streaming TTS API, conversational AI agents with WebSockets, and voice isolation for professional video production.',
    pricing: 'Freemium',
    isBeginnerFriendly: true,
    featured: false,
    tags: ['TTS', 'Voice AI', 'Audio', 'Localization'],
    url: 'https://elevenlabs.io'
  }
];

export const PROMPTS_DATA: PromptItem[] = [
  {
    id: 'prompt-1',
    title: 'Geospatial Satellite Imagery Classifier in Python',
    category: 'GIS & Remote Sensing',
    task: 'Generate a complete GeoPandas and scikit-learn workflow for multi-spectral classification.',
    template: 'Act as a Senior Geospatial Data Scientist. Write a production-ready Python script using [LIBRARY] to process a multi-band satellite raster file ([FILE_FORMAT]). Step 1: Normalize band values. Step 2: Extract training samples for classes [CLASSES]. Step 3: Train a Random Forest classifier. Step 4: Export the resulting classification map with embedded coordinate reference system [CRS]. Include clear error handling and memory optimization for large rasters.',
    variables: ['LIBRARY', 'FILE_FORMAT', 'CLASSES', 'CRS'],
    defaultValues: {
      LIBRARY: 'Rasterio and Scikit-Learn',
      FILE_FORMAT: 'Sentinel-2 GeoTIFF (.tif)',
      CLASSES: 'Water, Dense Vegetation, Urban Built-up, Bare Soil',
      CRS: 'EPSG:32636 (UTM Zone 36N)'
    },
    instructions: 'Replace the variables inside brackets before running. Recommended for Claude 3.5 Sonnet or GPT-4o with Python Code Interpreter.'
  },
  {
    id: 'prompt-2',
    title: 'High-Converting AI Freelance Service Offer',
    category: 'Business & Freelancing',
    task: 'Craft a structured freelance proposal for small business automation.',
    template: 'Act as a high-ticket freelance consultant. Craft a proposal response for a prospective client in the [INDUSTRY] industry who needs to automate [WORKFLOW_NAME]. Structure your response into: 1) Understanding of their core friction points, 2) Proposed 3-step AI implementation, 3) Estimated ROI and time saved per month, 4) Scope of work and deliverables, 5) Professional closing call-to-action. Tone: Authoritative, pragmatic, and devoid of hype.',
    variables: ['INDUSTRY', 'WORKFLOW_NAME'],
    defaultValues: {
      INDUSTRY: 'Real Estate Asset Management',
      WORKFLOW_NAME: 'Tenant Lease Agreement Parsing and Invoicing Reconciliation'
    },
    instructions: 'Fill in your prospective client details to produce customized bid proposals on Upwork or email pitches.'
  },
  {
    id: 'prompt-3',
    title: 'Production Code Refactor & Unit Test Suite',
    category: 'Software Engineering',
    task: 'Refactor messy procedural code into clean architecture with TypeScript unit tests.',
    template: 'Act as a Principal Software Architect. Review the following [LANGUAGE] code snippet: [PASTE_CODE]. Refactor it to enforce single responsibility, modular error handling, and type safety. Follow functional programming principles where suitable. Provide 4 comprehensive unit test cases covering edge cases using [TEST_FRAMEWORK].',
    variables: ['LANGUAGE', 'PASTE_CODE', 'TEST_FRAMEWORK'],
    defaultValues: {
      LANGUAGE: 'TypeScript / Node.js',
      PASTE_CODE: 'async function fetchRecords(req) { let d = await db.query(); return d.rows; }',
      TEST_FRAMEWORK: 'Vitest / Jest'
    },
    instructions: 'Paste your legacy or draft code block into [PASTE_CODE] and run it through your preferred developer assistant.'
  },
  {
    id: 'prompt-4',
    title: 'ATS-Optimized AI Role Resume Tailoring',
    category: 'Job Search & CV',
    task: 'Align resume achievements with an AI or data engineering job description.',
    template: 'You are an executive tech recruiter. Compare my current bullet points: "[MY_EXPERIENCE]" against this target job description: "[JOB_REQUIREMENTS]". Rewrite my experience into 4 high-impact, quantified bullet points using the Google X-Y-Z formula ("Accomplished [X] as measured by [Y] by doing [Z]"). Ensure target keywords for [TECH_STACK] are seamlessly integrated for ATS parsing.',
    variables: ['MY_EXPERIENCE', 'JOB_REQUIREMENTS', 'TECH_STACK'],
    defaultValues: {
      MY_EXPERIENCE: 'Built scripts to download satellite imagery and ran basic GIS map exports for regional reports.',
      JOB_REQUIREMENTS: 'Looking for a Geospatial Analyst skilled in automated earth observation pipelines, STAC catalogs, and GeoPandas data processing.',
      TECH_STACK: 'Python, GeoPandas, Rasterio, STAC API, QGIS'
    },
    instructions: 'Ideal for adapting technical and spatial skillsets to match enterprise hiring filters.'
  },
  {
    id: 'prompt-5',
    title: 'Deterministic JSON Data Extraction Agent',
    category: 'Automation',
    task: 'Extract strict schemas from unstructured emails or documents with guaranteed zero markdown.',
    template: 'You are a deterministic data parser. Extract the entities from the following text: "[SOURCE_TEXT]". Output ONLY valid RFC 8259 JSON matching this exact schema: {"customerName": string, "transactionId": string, "amount": number, "currency": string, "lineItems": [{"description": string, "quantity": number, "unitPrice": number}], "urgency": "low" | "medium" | "high"}. Rules: Do not wrap in markdown ```json blocks. Do not add conversational text or notes.',
    variables: ['SOURCE_TEXT'],
    defaultValues: {
      SOURCE_TEXT: 'Hi Team, please process order #ORD-9842 from Acme Corp (contact: John Doe). We need 5 licenses of Pro at $120 each and 1 enterprise setup fee at $400. Total is $1000 USD. Needed urgently by tomorrow morning!'
    },
    instructions: 'Designed for API backend pipelines or Make/Zapier automated webhooks.'
  }
];

export const JOBS_DATA: AIJob[] = [
  {
    id: 'job-1',
    title: 'Geospatial AI Data Annotator & Analyst',
    category: 'GIS & Spatial Analysis',
    type: 'Contract',
    location: 'Remote',
    experience: 'Entry-Level',
    salaryRange: '$28 - $38 / hour',
    skills: ['QGIS', 'Satellite Imagery', 'Polygon Labeling', 'Attention to Detail'],
    description: 'Review high-resolution satellite and aerial imagery to annotate land use boundaries, building footprints, and infrastructure corridors for computer vision model training.',
    responsibilities: [
      'Perform precision polygon annotation on multi-spectral satellite imagery in QGIS and CVAT.',
      'Audit AI-segmented building masks for false positives and boundary alignment.',
      'Document spatial anomalies and submit quality control reports to lead engineers.'
    ],
    qualifications: [
      'Basic familiarity with GIS software (QGIS, ArcGIS, or Google Earth Pro).',
      'High visual acuity and disciplined attention to spatial alignment standards.',
      'Ability to meet consistent daily throughput metrics in a remote environment.'
    ],
    postedDate: 'Sample listing · Updated October 2026',
    isSample: true,
    url: 'https://example.com/apply-sample-1'
  },
  {
    id: 'job-2',
    title: 'Prompt Engineer & Evaluation Specialist',
    category: 'Prompt Engineering',
    type: 'Freelance',
    location: 'Remote',
    experience: 'Intermediate',
    salaryRange: '$45 - $65 / hour',
    skills: ['RLHF', 'Red Teaming', 'Python', 'Evaluation Benchmarks'],
    description: 'Design rigorous evaluation test sets, benchmark prompts, and safety guardrails across multi-modal reasoning models and enterprise chatbots.',
    responsibilities: [
      'Formulate multi-turn adversarial prompt suites to probe model hallucination and security boundaries.',
      'Build scoring rubrics for factual accuracy, formatting compliance, and tone consistency.',
      'Script automated benchmark runners in Python using model APIs.'
    ],
    qualifications: [
      'Proven experience systematically designing zero-shot, few-shot, and chain-of-thought prompts.',
      'Strong analytical writing skills and familiarity with LLM benchmark datasets (e.g., MMLU, GSM8K).',
      'Basic Python proficiency for calling REST endpoints and parsing JSON evaluation results.'
    ],
    postedDate: 'Sample listing · Updated October 2026',
    isSample: true,
    url: 'https://example.com/apply-sample-2'
  },
  {
    id: 'job-3',
    title: 'Junior AI Workflow Automation Developer',
    category: 'Automation & Agents',
    type: 'Full-Time',
    location: 'Remote',
    experience: 'Entry-Level',
    salaryRange: '$62,000 - $78,000 / year',
    skills: ['Make.com', 'Zapier', 'REST APIs', 'OpenAI API', 'JSON'],
    description: 'Help small and mid-market businesses eliminate repetitive manual administration by wiring up no-code pipelines with frontier AI models.',
    responsibilities: [
      'Build and maintain webhook-triggered workflows connecting CRMs, databases, and LLM completions.',
      'Implement deterministic error handling and automatic retry routines in Make and n8n.',
      'Create documentation and video walkthroughs for client operations teams.'
    ],
    qualifications: [
      'Hands-on experience building complex scenarios in Make, Zapier, or n8n.',
      'Solid grasp of REST APIs, webhook payloads, Bearer token authentication, and JSON parsing.',
      'Self-driven troubleshooting attitude with clear communication skills.'
    ],
    postedDate: 'Sample listing · Updated October 2026',
    isSample: true,
    url: 'https://example.com/apply-sample-3'
  },
  {
    id: 'job-4',
    title: 'Computer Vision & Remote Sensing Engineer',
    category: 'Machine Learning',
    type: 'Full-Time',
    location: 'Hybrid',
    experience: 'Senior',
    salaryRange: '$125,000 - $155,000 / year',
    skills: ['PyTorch', 'GeoPandas', 'Sentinel-2', 'YOLOv8', 'Docker'],
    description: 'Lead the architecture and deployment of end-to-end earth observation pipelines detecting infrastructure changes across continental scales.',
    responsibilities: [
      'Train and fine-tune convolutional neural networks and vision transformers on multi-spectral satellite rasters.',
      'Optimize model inference for cloud deployments on GPU clusters with STAC data catalog inputs.',
      'Collaborate with GIS specialists to ensure sub-pixel geospatial projection accuracy.'
    ],
    qualifications: [
      '3+ years hands-on production experience with PyTorch and geospatial raster processing.',
      'Deep understanding of multi-band imagery (NIR, SWIR, Red-Edge) and sensor calibration.',
      'Proficiency in containerization (Docker) and cloud pipelines (AWS/GCP).'
    ],
    postedDate: 'Sample listing · Updated October 2026',
    isSample: true,
    url: 'https://example.com/apply-sample-4'
  }
];

export const GIS_RESOURCES: GisResource[] = [
  {
    id: 'gis-1',
    title: 'Autonomous Crop Health Mapping with Sentinel-2 and NDVI',
    level: 'Beginner',
    techStack: ['Python', 'Rasterio', 'Copernicus Hub', 'NumPy'],
    summary: 'A step-by-step introduction to computing Normalized Difference Vegetation Index (NDVI) values across regional agricultural zones using open satellite passes.',
    useCase: 'Precision Agriculture, Drought Detection & Yield Forecasting',
    readTime: '12 min read',
    steps: [
      {
        title: 'Step 1: Ingest Multi-Spectral Satellite Bands',
        description: 'Sentinel-2 captures light across 13 spectral bands. For vegetative analysis, we isolate Band 4 (Red ~665nm) and Band 8 (Near-Infrared / NIR ~842nm). Healthy chlorophyllic plants reflect massive amounts of NIR while absorbing visible Red light for photosynthesis.',
        language: 'python',
        codeSnippet: `import rasterio
import numpy as np

# Open Red (B04) and Near-Infrared (B08) 10-meter GeoTIFF bands
with rasterio.open('T36NYH_20260315_B04.jp2') as red_band:
    red = red_band.read(1).astype('float32')
    profile = red_band.profile

with rasterio.open('T36NYH_20260315_B08.jp2') as nir_band:
    nir = nir_band.read(1).astype('float32')`
      },
      {
        title: 'Step 2: Calculate NDVI Array Matrix',
        description: 'NDVI is mathematically computed as (NIR - Red) / (NIR + Red). The result generates normalized values strictly between -1.0 and +1.0. Values > 0.5 indicate lush, healthy vegetation, while values < 0.1 correspond to bare soil or water bodies.',
        language: 'python',
        codeSnippet: `# Prevent division-by-zero warnings on null or shadow pixels
np.seterr(divide='ignore', invalid='ignore')

# Mathematical Normalized Difference formula
ndvi = (nir - red) / (nir + red)

# Clean boundaries
ndvi = np.clip(ndvi, -1.0, 1.0)`
      },
      {
        title: 'Step 3: Export Geo-Referenced Raster Map',
        description: 'Write the resulting single-band floating point matrix to a GeoTIFF retaining the source Coordinate Reference System (CRS) and affine transform coordinates for GIS visualization.',
        language: 'python',
        codeSnippet: `# Update metadata profile for single-band output
profile.update(dtype=rasterio.float32, count=1, compress='lzw')

with rasterio.open('crop_health_ndvi_output.tif', 'w', **profile) as dst:
    dst.write(ndvi.astype(rasterio.float32), 1)

print("NDVI GeoTIFF exported successfully with native spatial metadata.")`
      }
    ]
  },
  {
    id: 'gis-2',
    title: 'Building Footprint Segmentation with Segment Anything (SAM)',
    level: 'Intermediate',
    techStack: ['Meta SAM', 'QGIS Plugin', 'OpenStreetMap', 'PyTorch'],
    summary: 'Utilize vision foundation models to extract building polygons automatically from high-resolution aerial imagery for municipal planning and land tenure audit.',
    useCase: 'Urban Development, Disaster Assessment & Infrastructure Audits',
    readTime: '18 min read',
    steps: [
      {
        title: 'Step 1: Set Up SAM Environment & Model Weights',
        description: 'The Segment Anything Model (SAM) from Meta AI enables zero-shot boundary delineation without retraining. In QGIS, install the Geo-SAM plugin and download the `sam_vit_h` or mobile `mobile_sam` checkpoint weights.',
        language: 'bash',
        codeSnippet: `# Install required deep learning runtime in your QGIS Python environment
pip install segment-anything torch torchvision opencv-python pyproj`
      },
      {
        title: 'Step 2: Interactive Prompting via Point Coordinates',
        description: 'Feed aerial orthophoto coordinates as positive (foreground structure) or negative (road/vegetation) prompts. SAM generates high-precision raster masks surrounding the rooftop boundaries.',
        language: 'python',
        codeSnippet: `from segment_anything import SamPredictor, sam_model_registry
import cv2

sam = sam_model_registry["vit_b"](checkpoint="sam_vit_b_01ec64.pth")
predictor = SamPredictor(sam)

image = cv2.imread("suburb_aerial_ortho.jpg")
predictor.set_image(image)

# Point prompt: [X, Y] pixel coordinates on center of building
input_point = np.array([[512, 340]])
input_label = np.array([1]) # 1 denotes foreground

masks, scores, logits = predictor.predict(
    point_coords=input_point,
    point_labels=input_label,
    multimask_output=False
)`
      },
      {
        title: 'Step 3: Vectorize Masks to GeoJSON Polygons',
        description: 'Convert raster masks into closed vector polygons and re-project back to geographic coordinates (EPSG:4326) using Shapely and GeoPandas for database ingestion.',
        language: 'python',
        codeSnippet: `import geopandas as gpd
from shapely.geometry import shape
from rasterio.features import shapes

# Extract vector polygons from binary mask
mask_shapes = shapes(masks[0].astype(np.int16), transform=affine_transform)
polygons = [shape(geom) for geom, val in mask_shapes if val == 1]

gdf = gpd.GeoDataFrame(geometry=polygons, crs="EPSG:4326")
gdf.to_file("extracted_buildings.geojson", driver="GeoJSON")`
      }
    ]
  },
  {
    id: 'gis-3',
    title: 'Wildfire Risk Modeling using Google Earth Engine & Random Forests',
    level: 'Advanced',
    techStack: ['Earth Engine API', 'JavaScript/Python', 'Thermal MODIS', 'Copernicus DEM'],
    summary: 'Synthesize multi-temporal climate conditions, digital elevation slopes, and fuel moisture indices into predictive fire vulnerability maps.',
    useCase: 'Environmental Protection, Forest Conservation & Emergency Logistics',
    readTime: '24 min read',
    steps: [
      {
        title: 'Step 1: Collect Planetary Environmental Predictors',
        description: 'Assemble multi-sensor datasets in Google Earth Engine: Digital Elevation Model (DEM) slope, Landsat Normalized Difference Moisture Index (NDMI), ERA5 ambient temperature, and wind speed layers.',
        language: 'javascript',
        codeSnippet: `// Google Earth Engine JavaScript API Snippet
var region = ee.Geometry.Polygon([[[-120.5, 38.2], [-119.8, 38.2], [-119.8, 38.8], [-120.5, 38.8]]]);

// 1. Terrain slope from SRTM DEM
var srtm = ee.Image('USGS/SRTMGL1_003');
var slope = ee.Terrain.slope(srtm);

// 2. Surface moisture from Sentinel-2
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(region)
  .filterDate('2026-06-01', '2026-08-30')
  .median();
var ndmi = s2.normalizedDifference(['B8', 'B11']).rename('NDMI');

var predictors = slope.addBands(ndmi);`
      },
      {
        title: 'Step 2: Train Cloud-Hosted Random Forest Classifier',
        description: 'Sample historical MODIS thermal fire burn perimeters as ground-truth training points and fit a Random Forest ensemble classifier.',
        language: 'javascript',
        codeSnippet: `// Sample historical fire presence/absence points
var trainingPoints = ee.FeatureCollection('users/fire_archive/historical_burns');
var trainingData = predictors.sampleRegions({
  collection: trainingPoints,
  properties: ['fire_occurred'],
  scale: 30
});

// Train 100-tree Random Forest
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: trainingData,
  classProperty: 'fire_occurred',
  inputProperties: ['slope', 'NDMI']
});

var riskMap = predictors.classify(classifier);
Map.addLayer(riskMap, {min: 0, max: 1, palette: ['green', 'yellow', 'red']}, 'Fire Vulnerability');`
      }
    ]
  }
];

export const LEARNING_COURSES: LearningCourse[] = [
  {
    id: 'course-1',
    title: 'Foundations of Practical Generative AI',
    category: 'Fundamentals',
    difficulty: 'Beginner',
    duration: '3 hours',
    description: 'A comprehensive, hype-free introduction to how modern language and vision models actually operate under the hood, with direct hands-on exercises.',
    outcomes: [
      'Understand how LLMs calculate next-token probabilities and attention matrices',
      'Master zero-shot, few-shot, and system prompt engineering paradigms',
      'Diagnose and eliminate common hallucination traps in everyday tasks',
      'Evaluate cost vs quality tradeoffs between frontier models (Claude, GPT, Gemini, Llama)'
    ],
    modules: [
      { id: 'm1', title: 'The Token Mechanics: Why AI Hallucinates', duration: '40 min', overview: 'How tokenizers split text, probability sampling (temperature/top_p), and context window limits.' },
      { id: 'm2', title: 'System Instructions & Persona Framing', duration: '50 min', overview: 'Structuring system constraints to lock tone, restrict capabilities, and ensure accuracy.' },
      { id: 'm3', title: 'Building Your First Practical Workflow', duration: '60 min', overview: 'Creating a repeatable document summary and key takeaway extractor.' },
      { id: 'm4', title: 'Responsible AI & Verifiability Protocols', duration: '30 min', overview: 'Techniques for fact-checking model outputs and maintaining data privacy.' }
    ]
  },
  {
    id: 'course-2',
    title: 'Systematic Prompt Engineering for Developers',
    category: 'Prompting',
    difficulty: 'Intermediate',
    duration: '5 hours',
    description: 'Shift from conversational chatting to engineering deterministic, production-grade prompts that deliver strict JSON schemas and reliable tool executions.',
    outcomes: [
      'Design deterministic JSON extraction prompts with 99%+ schema reliability',
      'Implement chain-of-thought and self-consistency protocols for mathematical/logical reasoning',
      'Prevent adversarial prompt injection attacks and protect confidential system prompts',
      'Integrate prompts into production TypeScript and Python applications'
    ],
    modules: [
      { id: 'm1', title: 'Deterministic Schema Enforcement', duration: '75 min', overview: 'Using JSON mode, TypeScript interfaces, and schema validators to guarantee clean API data.' },
      { id: 'm2', title: 'Reasoning Frameworks: Chain of Thought & ReAct', duration: '85 min', overview: 'Guiding models through transparent step-by-step reasoning before answering.' },
      { id: 'm3', title: 'Few-Shot Exemplar Selection', duration: '60 min', overview: 'Curating dynamic few-shot examples using vector similarity.' },
      { id: 'm4', title: 'Red Teaming & Defense Against Prompt Injections', duration: '80 min', overview: 'Sanitizing user inputs, delimiting untrusted text, and building guardrail filters.' }
    ]
  },
  {
    id: 'course-3',
    title: 'Building Scalable Workflows with Make & AI Agents',
    category: 'Automation',
    difficulty: 'Beginner',
    duration: '4 hours',
    description: 'Learn how to automate real client administration, email dispatch, and data enrichment using no-code automation platforms with native AI blocks.',
    outcomes: [
      'Connect webhook triggers to generative AI endpoints with real-time error handling',
      'Format automated client email briefings and CRM updates without manual data entry',
      'Build an automated customer inquiry classification and ticket triage routing bot',
      'Package and price automation services for freelance client engagements'
    ],
    modules: [
      { id: 'm1', title: 'Make.com & Webhook Fundamentals', duration: '60 min', overview: 'Understanding triggers, routers, data mapping, and REST API calls.' },
      { id: 'm2', title: 'Integrating Frontier AI API Blocks', duration: '60 min', overview: 'Passing dynamic scenario data to LLM modules and parsing the structured responses.' },
      { id: 'm3', title: 'Building an Automated Lead Qualifier', duration: '70 min', overview: 'A complete end-to-end pipeline: Form submission -> AI enrichment -> Slack alert -> CRM update.' },
      { id: 'm4', title: 'Client Packaging & Freelance Monetization', duration: '50 min', overview: 'How to price automation retainers, structure deliverables, and handover documentation.' }
    ]
  },
  {
    id: 'course-4',
    title: 'Geospatial Data Science & Spatial Machine Learning',
    category: 'Geospatial AI',
    difficulty: 'Advanced',
    duration: '8 hours',
    description: 'Transform satellite imagery into commercial intelligence. Master GeoPandas, raster algebra, Sentinel-2 APIs, and Random Forest classification in Python.',
    outcomes: [
      'Load, transform, and clean vector and raster layers in Python using standard libraries',
      'Query SpatioTemporal Asset Catalogs (STAC) to programmatically download cloud-free satellite passes',
      'Train supervised land-cover classifiers and calculate NDVI/NDWI vegetative indices',
      'Export publication-grade interactive web maps with Folium and MapLibre'
    ],
    modules: [
      { id: 'm1', title: 'Spatial Data Structures: Vector vs. Raster', duration: '90 min', overview: 'Coordinate Reference Systems (CRS), affine transforms, GeoDataFrames, and Shapely geometry.' },
      { id: 'm2', title: 'Programmatic Satellite Ingestion via STAC', duration: '110 min', overview: 'Automating downloads from Copernicus Hub and AWS Earth observation open buckets.' },
      { id: 'm3', title: 'Machine Learning Classification on Multi-Band Rasters', duration: '140 min', overview: 'Extracting pixel spectral signatures, training Random Forests, and generating accuracy confusion matrices.' },
      { id: 'm4', title: 'Interactive Web Mapping & Client Dashboards', duration: '140 min', overview: 'Publishing interactive spatial dashboards using Streamlit, Folium, and cloud GeoTIFFs.' }
    ]
  }
];
