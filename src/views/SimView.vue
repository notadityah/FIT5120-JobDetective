<template>
  <div class="sim-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Interactive Scam Simulation</h1>
          <p class="hero-subtitle">
            Practice spotting red flags in fake job offers through interactive scenarios.
          </p>
        </div>
      </div>
    </section>

    <!-- Simulation Cards Section -->
    <section class="simulation-section">
      <div class="container">
        <div class="row g-4">
          <!-- Scenario 1: Engineering Manager -->
          <div class="col-lg-6 col-md-6">
            <div class="simulation-card h-100">
              <div class="card-icon mb-3">
                <i class="fas fa-cogs"></i>
              </div>
              <h3 class="card-title mb-3">Scenario 1: Engineering Manager</h3>
              <p class="card-description mb-4">
                Senior engineering role with emotional manipulation and excessive empowerment
                language.
              </p>
              <button
                class="btn btn-primary btn-simulation w-100"
                @click="startSimulation('engineering-manager')"
              >
                Try Scenario
              </button>
            </div>
          </div>

          <!-- Scenario 2: Healthcare Manager -->
          <div class="col-lg-6 col-md-6">
            <div class="simulation-card h-100">
              <div class="card-icon mb-3">
                <i class="fas fa-user-md"></i>
              </div>
              <h3 class="card-title mb-3">Scenario 2: Healthcare Manager</h3>
              <p class="card-description mb-4">
                Quality improvement manager position with vague application process and generic
                descriptions.
              </p>
              <button
                class="btn btn-primary btn-simulation w-100"
                @click="startSimulation('healthcare-manager')"
              >
                Try Scenario
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal for Simulation -->
    <div v-if="showSimulationModal" class="modal-overlay" @click="closeSimulationModal">
      <div class="simulation-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ currentSimulation.title }}</h3>
          <button class="modal-close" @click="closeSimulationModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p class="scenario-intro">{{ currentSimulation.intro }}</p>

          <!-- Job Posting Mock-up -->
          <div class="job-posting" v-if="currentSimulation.jobPosting">
            <div class="job-header">
              <div class="job-title-section">
                <h4>{{ currentSimulation.jobPosting.title }}</h4>
                <p class="company-name">{{ currentSimulation.jobPosting.company }}</p>
              </div>
              <span class="remote-badge">{{ currentSimulation.jobPosting.location }}</span>
            </div>

            <div class="job-details">
              <div class="job-description" v-html="currentSimulation.jobPosting.description"></div>

              <div class="job-requirements" v-if="currentSimulation.jobPosting.requirements">
                <h5>Requirements:</h5>
                <ul>
                  <li v-for="req in currentSimulation.jobPosting.requirements" :key="req">
                    {{ req }}
                  </li>
                </ul>
              </div>

              <div
                class="job-responsibilities"
                v-if="currentSimulation.jobPosting.responsibilities"
              >
                <h5>Responsibilities:</h5>
                <ul>
                  <li v-for="resp in currentSimulation.jobPosting.responsibilities" :key="resp">
                    {{ resp }}
                  </li>
                </ul>
              </div>

              <div class="application-section">
                <h5>How to Apply:</h5>
                <p v-html="currentSimulation.jobPosting.application"></p>
              </div>
            </div>
          </div>

          <div class="alert alert-info mt-3">
            <i class="fas fa-info-circle me-2"></i>
            Click on the highlighted red flags to learn about common scam tactics.
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeSimulationModal">
            Close
          </button>
          <button type="button" class="btn btn-outline-primary" @click="showRedFlags">
            <i class="fas fa-flag me-2"></i>Reveal Red Flags
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimView',
  data() {
    return {
      showSimulationModal: false,
      currentSimulation: {
        title: '',
        intro: '',
        jobPosting: null,
      },
      simulations: {
        'engineering-manager': {
          title: 'Scenario: Engineering Manager Fraud',
          intro: 'Examine this engineering management position and spot the manipulative language.',
          jobPosting: {
            title: 'Senior Engineering Product Manager',
            company: 'Service Provider Engineering Team',
            location: 'Remote/Flexible',
            description: `As a member of the Service Provider Engineering team, you will be responsible for managing the development of broadband DSL products targeted at service providers that provide Home Gateway, voice gateways, wireless adapters, IPTV and Voice over IP (VoIP) services.<br><br>
            A word from the Recruiter: "<strong class="highlight" data-flag="emotional-manipulation">Some of the exciting things that retain engineers here are the new technologies that we integrate into our products. Most People hear about these technologies 9 months after the product development has launched, our engineers actually start learning about the new technologies in advance of any silicon introductions.</strong> In most cases, we are an early partner to silicon vendors and help guide the silicon features. This is extremely rare for many of the new members, once they do the first project they want more and more. As you can imagine the value of that engineer is much greater then when they walked in the door."<br><br>
            "<strong class="highlight" data-flag="empowerment-language">Here, the PE is the complete owner of every molecule of the product, including mechanical, operation, finance, cost, etc. This empowerment is another added value boost an engineer could benefit from, this value is rare and will push the engineer in the direction of someday running a business end to end with a larger responsibility and scope.</strong>"<br><br>
            This is what not shared on the JD. "<strong class="highlight" data-flag="career-promises">How you will mature your career.</strong>"`,
            responsibilities: [
              'For assigned projects, take overall responsibility for delivering the product to production',
              'Project management. Develop and maintain project plans',
              "Project Execution. Manage the suppliers' (ODM, chip vendor, etc.) product development process",
              'Product Verification. Manage verification testing of product features and performance',
              'Customer Certification. Manage qualification of products with customers',
              'Documentation. Provide input for manuals, help files, application notes, marketing materials and tech support',
              'Support. Resolve any 3rd level technical support escalations',
              'Track industry technology developments, supplier roadmaps, standards bodies and make product recommendations',
            ],
            requirements: [
              "Bachelor's degree in Engineering or related field",
              'Minimum 5 years of product management experience',
              'Strong technical background in networking technologies',
              'Experience with DSL, Routers, 802.11 Wireless, VPN, Firewalls',
              'Project management skills',
              'Excellent communication and leadership abilities',
            ],
            application: `Please submit your resume and portfolio to our talent acquisition team. <strong class="highlight" data-flag="vague-application">Contact details will be provided upon initial interest.</strong>`,
          },
        },
        'healthcare-manager': {
          title: 'Scenario: Healthcare Quality Manager Scam',
          intro: 'Review this healthcare management position and identify the red flags.',
          jobPosting: {
            title: 'Quality Improvement Manager',
            company: 'Florida Healthcare Plus (FHCP)',
            location: 'Florida',
            description: `<strong class="highlight" data-flag="vague-application">Apply using below link</strong><br><br>
            The Quality Improvement Manager is responsible for the further development, operation, oversight and evaluation of the <strong class="highlight" data-flag="generic-claims">Florida Healthcare Plus (FHCP) quality improvement program</strong> as documented in the FHC Quality Work Plan.<br><br>
            We are seeking a RN with a minimum 2 years of experience in Managed Care QI. A successful candidate will have a <strong class="highlight" data-flag="vague-requirements">demonstrable history of managing managed care quality programs</strong> including the successful support of accreditation or reaccreditation reviews and government payer quality audits. Experience with HEDIS and CAHPS improvement activities is desirable.<br><br>
            The candidate must be a <strong class="highlight" data-flag="buzzwords">self-motivated, extremely energetic leader of people</strong> with strong management and organization skills and the capacity to frame their responsibilities as a service to the internal and external customers of FHCP.`,
            responsibilities: [
              'Manage the FHCP Quality Improvement Program',
              'Support and oversee the activities of the FHCP Q.I. Sub-Committees',
              'Document and report the progress of the FHCP quality cycle',
              'Implement, manage and oversee the quality element of the FHCP Models of Care',
              'Develop and manage the FHCP pre-accreditation audit program',
              'Develop and support the FHCP continuous process improvement program',
              'Operate the FHCP Quality of Care investigation and tracking program',
              'Oversee and support the FHCP quality study activities and interventions',
              'Operate the FHCP vendor, provider and staff quality training and audit program',
              'Supervise of the QI Nurse Coordinator',
            ],
            requirements: [
              'RN with minimum 2 years of experience in Managed Care QI',
              'Demonstrable history of managing managed care quality programs',
              'Experience with accreditation or reaccreditation reviews',
              'Government payer quality audits experience',
              'HEDIS and CAHPS improvement activities experience (desirable)',
              'Strong management and organization skills',
              'Excellent analytical, problem solving and troubleshooting abilities',
              'Self-motivated with ability to work independently and in team environment',
            ],
            application: `Interested candidates should submit their credentials through our secure portal. <strong class="highlight" data-flag="missing-contact">Specific application instructions will be provided separately.</strong>`,
          },
        },
      },
    }
  },
  methods: {
    startSimulation(type) {
      this.currentSimulation = this.simulations[type]
      this.showSimulationModal = true
    },
    closeSimulationModal() {
      this.showSimulationModal = false
      this.resetModalState()
    },
    resetModalState() {
      this.currentSimulation = {
        title: '',
        intro: '',
        jobPosting: null,
      }
    },
    showRedFlags() {
      // Future functionality to highlight and explain red flags
      alert(
        'Red flag detection feature coming soon! This will highlight and explain each suspicious element in the job posting.',
      )
    },
  },
}
</script>

<style scoped>
.sim-container {
  min-height: 100vh;
  background: #ffffff;
  color: #0f172a;
}

.hero-section {
  padding: 3rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 0 0 24px 24px;
}

.hero-content {
  text-align: center;
}

.hero-text {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 400;
}

.simulation-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.simulation-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: none;
  position: relative;
  transition: all 0.3s ease;
}

.simulation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4f7cff 0%, #3b5aa0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.card-title {
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.card-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn-simulation {
  background: linear-gradient(135deg, #4f7cff 0%, #3b5aa0 100%);
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
}

.btn-simulation:hover {
  background: linear-gradient(135deg, #3b5aa0 0%, #2d4373 100%);
  transform: translateY(-1px);
  color: white;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.simulation-modal {
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.modal-close {
  background: none;
  border: none;
  color: #6c757d;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-close:hover {
  color: #2d3748;
}

/* Job Posting Styles */
.scenario-intro {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
}

.job-posting {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.job-title-section h4 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.company-name {
  color: #4a5568;
  font-size: 1rem;
  margin: 0;
}

.remote-badge {
  background: #edf2f7;
  color: #2d3748;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.job-details h5 {
  color: #2d3748;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1.5rem 0 1rem 0;
}

.job-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.job-requirements,
.job-responsibilities {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.job-requirements ul,
.job-responsibilities ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.job-requirements li,
.job-responsibilities li {
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.application-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #fff5f5;
  border-left: 4px solid #fed7d7;
  border-radius: 0 8px 8px 0;
}

.highlight {
  background: linear-gradient(120deg, #ffeaa7 0%, #fab1a0 100%);
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.highlight:hover {
  background: linear-gradient(120deg, #fdcb6e 0%, #e17055 100%);
  transform: scale(1.02);
}

.alert {
  background-color: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.alert-info {
  color: #1e40af;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2.4rem;
  }

  .simulation-section {
    padding: 2rem 1.5rem;
  }

  .simulation-card {
    padding: 1.5rem;
  }

  .simulation-modal {
    width: 95%;
    max-height: 85vh;
  }

  .job-header {
    flex-direction: column;
    gap: 1rem;
  }

  .modal-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2.25rem 1rem 1.25rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .simulation-section {
    padding: 1.5rem 1rem;
  }
}
</style>
