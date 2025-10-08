<template>
  <div class="scenario-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ scenarioData.title }}</h1>
          <p class="hero-subtitle">{{ scenarioData.intro }}</p>

          <!-- Back Button -->
          <div class="hero-actions">
            <button class="btn btn-outline-secondary" @click="goBack">
              <i class="fas fa-arrow-left me-2"></i>Back to Simulations
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Job Posting Section -->
    <section class="job-posting-section" v-if="scenarioData.jobPosting">
      <div class="container">
        <!-- Instructions Alert -->
        <div class="alert alert-info mb-4">
          <i class="fas fa-info-circle me-2"></i>
          Look for suspicious text and click on it to learn about red flags. Hover over text to see
          clickable areas.
        </div>

        <!-- Job Posting Mock-up -->
        <div class="job-posting">
          <div class="job-header">
            <div class="job-title-section">
              <h4>{{ scenarioData.jobPosting.title }}</h4>
              <p class="company-name">{{ scenarioData.jobPosting.company }}</p>
            </div>
            <span class="remote-badge">{{ scenarioData.jobPosting.location }}</span>
          </div>

          <div class="job-details">
            <div
              class="job-description"
              v-html="processedDescription"
              @click="handleHighlightClick"
            ></div>

            <div class="job-requirements" v-if="scenarioData.jobPosting.requirements">
              <h5>Requirements:</h5>
              <ul>
                <li
                  v-for="req in scenarioData.jobPosting.requirements"
                  :key="req"
                  v-html="addClickableHighlights(req)"
                  @click="handleHighlightClick"
                ></li>
              </ul>
            </div>

            <div class="job-responsibilities" v-if="scenarioData.jobPosting.responsibilities">
              <h5>Responsibilities:</h5>
              <ul>
                <li
                  v-for="resp in scenarioData.jobPosting.responsibilities"
                  :key="resp"
                  v-html="addClickableHighlights(resp)"
                  @click="handleHighlightClick"
                ></li>
              </ul>
            </div>

            <div class="application-section">
              <h5>How to Apply:</h5>
              <p v-html="processedApplication" @click="handleHighlightClick"></p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="scenario-actions">
          <div class="action-buttons">
            <button
              class="btn btn-primary btn-lg"
              @click="revealRedFlags"
              :disabled="redFlagsRevealed"
            >
              <i class="fas fa-flag me-2"></i>
              {{ redFlagsRevealed ? 'Red Flags Revealed' : 'Reveal Red Flags' }}
            </button>

            <button class="btn btn-outline-primary btn-lg" @click="goBack">
              <i class="fas fa-arrow-left me-2"></i>Try Another Scenario
            </button>
          </div>
        </div>

        <!-- Red Flags Explanation (shown after reveal) -->
        <div v-if="redFlagsRevealed" class="red-flags-explanation">
          <h3 class="explanation-title">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Red Flags Identified
          </h3>

          <div class="red-flag-cards">
            <div class="red-flag-card" v-for="flag in redFlagExplanations" :key="flag.type">
              <div class="flag-header">
                <i class="fas fa-flag flag-icon"></i>
                <h5>{{ flag.title }}</h5>
              </div>
              <p class="flag-description">{{ flag.description }}</p>
              <div class="flag-tip"><strong>Tip:</strong> {{ flag.tip }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Not Found State -->
    <section v-else class="not-found-section">
      <div class="container text-center">
        <div class="not-found-content">
          <i class="fas fa-exclamation-circle not-found-icon"></i>
          <h2>Scenario Not Found</h2>
          <p>The requested scenario could not be found.</p>
          <button class="btn btn-primary" @click="goBack">
            <i class="fas fa-arrow-left me-2"></i>Back to Simulations
          </button>
        </div>
      </div>
    </section>

    <!-- Red Flag Detail Modal -->
    <div v-if="showRedFlagModal" class="modal-overlay" @click="closeRedFlagModal">
      <div class="red-flag-modal" @click.stop>
        <div class="modal-header">
          <h4>🚩 {{ selectedRedFlag.title }}</h4>
          <button class="modal-close" @click="closeRedFlagModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="flag-explanation">
            <div class="explanation-section">
              <h5>Why This Is a Red Flag:</h5>
              <p>{{ selectedRedFlag.description }}</p>
            </div>
            <div class="tip-section">
              <h5>💡 What to Look For Instead:</h5>
              <p>{{ selectedRedFlag.tip }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeRedFlagModal">Got It!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScenarioView',
  data() {
    return {
      redFlagsRevealed: false,
      showRedFlagModal: false,
      selectedRedFlag: {},
      redFlagDefinitions: {
        'emotional-manipulation': {
          title: 'Emotional Manipulation',
          description:
            'Uses exciting language about "exclusive" technologies and opportunities to create emotional investment before revealing job details.',
          tip: 'Legitimate companies focus on role responsibilities and company culture, not on making you feel "special" or "chosen".',
        },
        'empowerment-language': {
          title: 'Excessive Empowerment Claims',
          description:
            'Promises unrealistic control ("owner of every molecule") and career advancement that sounds too good to be true.',
          tip: 'Real job descriptions are specific about actual responsibilities and realistic growth opportunities.',
        },
        'career-promises': {
          title: 'Vague Career Promises',
          description:
            'Makes broad promises about career development without specific details about how this will be achieved.',
          tip: 'Look for concrete information about training programs, mentorship, and clear advancement paths.',
        },
        'vague-application': {
          title: 'Incomplete Application Process',
          description:
            "Doesn't provide specific contact information or clear application instructions.",
          tip: 'Legitimate employers provide clear application processes with specific contact details and company information.',
        },
        'generic-claims': {
          title: 'Generic Company Claims',
          description:
            'Makes broad claims about company programs without specific, verifiable details.',
          tip: 'Research the company independently to verify claims about programs and accreditations.',
        },
        'vague-requirements': {
          title: 'Vague Requirements',
          description:
            'Uses non-specific language like "demonstrable history" without clear criteria.',
          tip: 'Legitimate jobs specify exact requirements, certifications, and measurable experience.',
        },
        buzzwords: {
          title: 'Excessive Buzzwords',
          description:
            'Overuses personality descriptors like "extremely energetic" instead of focusing on skills.',
          tip: 'Real job descriptions emphasize specific skills, qualifications, and measurable attributes.',
        },
        'missing-contact': {
          title: 'Missing Contact Information',
          description:
            'Promises application instructions "separately" without providing immediate contact details.',
          tip: 'Legitimate employers provide clear, immediate contact information and application processes.',
        },
        'dynamic-buzzwords': {
          title: 'Excessive Personality Buzzwords',
          description:
            'Uses appealing personality descriptors like "dynamic" instead of focusing on genuine qualifications; often found in fake job ads.',
          tip: 'Look for specific skills, experience requirements, and measurable qualifications rather than vague personality traits.',
        },
        'company-history': {
          title: 'Unverifiable Company Claims',
          description:
            'Provides grandiose or specific company history that cannot be easily verified and may be fabricated to create legitimacy.',
          tip: 'Research company claims independently through official websites, business registries, and professional networks.',
        },
        'exaggerated-scope': {
          title: 'Exaggerated Business Scope',
          description:
            'Claims of national reach or extensive services without evidence; scammers often exaggerate their business scope to appear legitimate.',
          tip: 'Verify company size and scope through official business directories and client testimonials.',
        },
        'promotional-language': {
          title: 'Overly Promotional Language',
          description:
            'Uses emotionally persuasive and marketing-heavy language designed to build excitement rather than provide factual information.',
          tip: 'Professional job descriptions focus on factual role details rather than promotional company messaging.',
        },
        'generous-compensation': {
          title: 'Overly Generous Compensation Claims',
          description:
            'Makes non-specific but appealing compensation promises that sound too good to be true, commonly used to lure applicants.',
          tip: 'Legitimate employers provide specific salary ranges and clear compensation structures with verifiable details.',
        },
        'generic-soft-skills': {
          title: 'Generic Soft Skills Priority',
          description:
            'Prioritizes generic personality traits over relevant, concrete technical requirements; designed to appeal to a wide audience.',
          tip: 'Look for specific technical skills, certifications, and measurable experience requirements.',
        },
        'incomplete-contact': {
          title: 'Incomplete Contact Information',
          description:
            'Provides broken or incomplete contact details that prevent proper verification and can be used to harvest personal data.',
          tip: 'Always verify complete contact information including working email addresses, phone numbers, and physical addresses.',
        },
      },
      scenarios: {
        'engineering-manager': {
          title: 'Scenario: Engineering Manager Fraud',
          intro: 'Examine this engineering management position and spot the manipulative language.',
          jobPosting: {
            title: 'Senior Engineering Product Manager',
            company: 'Service Provider Engineering Team',
            location: 'Remote/Flexible',
            description: `As a member of the Service Provider Engineering team, you will be responsible for managing the development of broadband DSL products targeted at service providers that provide Home Gateway, voice gateways, wireless adapters, IPTV and Voice over IP (VoIP) services.<br><br>
            A word from the Recruiter: "<span class="red-flag-text" data-flag="emotional-manipulation">Some of the exciting things that retain engineers here are the new technologies that we integrate into our products. Most People hear about these technologies 9 months after the product development has launched, our engineers actually start learning about the new technologies in advance of any silicon introductions. In most cases, we are an early partner to silicon vendors and help guide the silicon features. This is extremely rare for many of the new members, once they do the first project they want more and more. As you can imagine the value of that engineer is much greater then when they walked in the door</span>."<br><br>
            "<span class="red-flag-text" data-flag="empowerment-language">Here, the PE is the complete owner of every molecule of the product, including mechanical, operation, finance, cost, etc. This empowerment is another added value boost an engineer could benefit from, this value is rare and will push the engineer in the direction of someday running a business end to end with a larger responsibility and scope.</span>"<br><br>
            This is what not shared on the JD. "<span class="red-flag-text" data-flag="career-promises">How you will mature your career.</span>"`,
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
            application: `Please submit your resume and portfolio to our talent acquisition team. <span class="red-flag-text" data-flag="vague-application">Contact details will be provided upon initial interest.</span>`,
          },
        },
        'healthcare-manager': {
          title: 'Scenario: Healthcare Quality Manager Scam',
          intro: 'Review this healthcare management position and identify the red flags.',
          jobPosting: {
            title: 'Quality Improvement Manager',
            company: 'Florida Healthcare Plus (FHCP)',
            location: 'Florida',
            description: `<span class="red-flag-text" data-flag="vague-application">Apply using below link</span><br><br>
            The Quality Improvement Manager is responsible for the further development, operation, oversight and evaluation of the <span class="red-flag-text" data-flag="generic-claims">Florida Healthcare Plus (FHCP) quality improvement program</span> as documented in the FHC Quality Work Plan.<br><br>
            We are seeking a RN with a minimum 2 years of experience in Managed Care QI. A successful candidate will have a <span class="red-flag-text" data-flag="vague-requirements">demonstrable history of managing managed care quality programs</span> including the successful support of accreditation or reaccreditation reviews and government payer quality audits. Experience with HEDIS and CAHPS improvement activities is desirable.<br><br>
            The candidate must be a <span class="red-flag-text" data-flag="buzzwords">self-motivated, extremely energetic leader of people</span> with strong management and organization skills and the capacity to frame their responsibilities as a service to the internal and external customers of FHCP.`,
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
            application: `Interested candidates should submit their credentials through our secure portal. <span class="red-flag-text" data-flag="missing-contact">Specific application instructions will be provided separately.</span>`,
          },
        },
        'skynet-sales': {
          title: 'Scenario: SkyNet IT Sales Position Scam',
          intro: 'Analyze this technology sales position and discover the deceptive tactics.',
          jobPosting: {
            title: 'Technology Sales Professional',
            company: 'SkyNet Managed Technology Services',
            location: 'Columbus, Ohio',
            description: `<span class="red-flag-text" data-flag="vague-application">Apply below using link</span><br><br>
            SkyNet Managed Technology Services, a leading IT consulting firm based in Columbus, Ohio, is seeking a <span class="red-flag-text" data-flag="dynamic-buzzwords">dynamic sales professional</span> who can hunt, identify opportunities, and sell technology solutions and professional services. This is a consultative sales position dealing directly with a variety of business contacts from C-Level to Administrative. Experience in selling technology services will give you the advantage.<br><br>
            <span class="red-flag-text" data-flag="company-history">SkyNet Managed Technology Services was founded in 2002 to provide technology support to small and medium sized businesses.</span> <span class="red-flag-text" data-flag="exaggerated-scope">We cover a wide-range of solutions for businesses throughout the country.</span> Everything from project consulting, internet solutions, and a complete IT department. <span class="red-flag-text" data-flag="promotional-language">Our objective is to eradicate the hassles of IT from our client's lives and let them focus on dominating in their industry.</span><br><br>
            <span class="red-flag-text" data-flag="generous-compensation">Excellent compensation plan includes base pay, commissions, performance incentives, training and benefits.</span>`,
            responsibilities: [
              'Actively pursue new business opportunities through prospecting, cold calling, qualifying, scheduling appointments, and networking',
              'Meet or exceed targeted monthly, quarterly, and annual sales activity and sales revenue goals',
              'Maintain the Customer Relationship Management (CRM) database of client and prospect information',
              'Manage activities, leads, opportunities, and sales pipeline',
            ],
            requirements: [
              "Bachelor's degree or equivalent preferred",
              'Minimum 3 years consultative business-to-business sales experience',
              'Demonstrated success in prospecting, cold calling, qualifying and overcoming objections',
              'Familiarity with technology industry',
              'Exceptional verbal, written, interpersonal, and presentation communication skills',
              'Customer focused attitude ensuring the highest level of support to our customer base',
              'Professional appearance and conduct',
              'Ability to quickly establish rapport with a variety of business decision makers',
              'Ability to understand and execute a professional sales methodology',
              'Understanding of Microsoft Office products',
              'Experience with CRM',
              '<span class="red-flag-text" data-flag="generic-soft-skills">High energy, self starter</span>',
            ],
            application: `To Apply: <span class="red-flag-text" data-flag="incomplete-contact">E-mail resume and cover letter with salary requirements to .</span>`,
          },
        },
      },
      redFlagExplanations: [],
    }
  },
  computed: {
    scenarioId() {
      return this.$route.params.id
    },
    scenarioData() {
      return this.scenarios[this.scenarioId] || {}
    },
    processedDescription() {
      if (!this.scenarioData.jobPosting?.description) return ''
      return this.addClickableHighlights(this.scenarioData.jobPosting.description)
    },
    processedApplication() {
      if (!this.scenarioData.jobPosting?.application) return ''
      return this.addClickableHighlights(this.scenarioData.jobPosting.application)
    },
  },
  mounted() {
    this.setupRedFlagExplanations()
  },
  methods: {
    goBack() {
      this.$router.push('/simulation')
    },
    revealRedFlags() {
      this.redFlagsRevealed = true

      // Add visual emphasis to red flag text elements
      setTimeout(() => {
        const redFlags = document.querySelectorAll('.red-flag-text')
        redFlags.forEach((el) => {
          el.classList.add('revealed')
        })
      }, 100)
    },
    addClickableHighlights(html) {
      // Make red flag text clickable by adding cursor pointer
      return html.replace(
        /<span class="red-flag-text" data-flag="([^"]+)">([^<]+)<\/span>/g,
        '<span class="red-flag-text clickable-red-flag" data-flag="$1" style="cursor: pointer;">$2</span>',
      )
    },
    handleHighlightClick(event) {
      if (event.target.classList.contains('red-flag-text')) {
        const flagType = event.target.getAttribute('data-flag')
        if (flagType && this.redFlagDefinitions[flagType]) {
          this.selectedRedFlag = this.redFlagDefinitions[flagType]
          this.showRedFlagModal = true

          // Add visual feedback when clicked
          event.target.classList.add('clicked')
          setTimeout(() => {
            event.target.classList.remove('clicked')
          }, 300)
        }
      }
    },
    closeRedFlagModal() {
      this.showRedFlagModal = false
      this.selectedRedFlag = {}
    },
    setupRedFlagExplanations() {
      if (this.scenarioId === 'engineering-manager') {
        this.redFlagExplanations = [
          {
            type: 'emotional-manipulation',
            title: 'Emotional Manipulation',
            description:
              'Uses exciting language about "exclusive" technologies and opportunities to create emotional investment before revealing job details.',
            tip: 'Legitimate companies focus on role responsibilities and company culture, not on making you feel "special" or "chosen".',
          },
          {
            type: 'empowerment-language',
            title: 'Excessive Empowerment Claims',
            description:
              'Promises unrealistic control ("owner of every molecule") and career advancement that sounds too good to be true.',
            tip: 'Real job descriptions are specific about actual responsibilities and realistic growth opportunities.',
          },
          {
            type: 'career-promises',
            title: 'Vague Career Promises',
            description:
              'Makes broad promises about career development without specific details about how this will be achieved.',
            tip: 'Look for concrete information about training programs, mentorship, and clear advancement paths.',
          },
          {
            type: 'vague-application',
            title: 'Incomplete Application Process',
            description:
              "Doesn't provide specific contact information or clear application instructions.",
            tip: 'Legitimate employers provide clear application processes with specific contact details and company information.',
          },
        ]
      } else if (this.scenarioId === 'healthcare-manager') {
        this.redFlagExplanations = [
          {
            type: 'vague-application',
            title: 'Vague Application Instructions',
            description: "References a link that doesn't exist and provides no clear way to apply.",
            tip: 'Real job postings include specific application instructions with working links or contact information.',
          },
          {
            type: 'generic-claims',
            title: 'Generic Company Claims',
            description:
              'Makes broad claims about company programs without specific, verifiable details.',
            tip: 'Research the company independently to verify claims about programs and accreditations.',
          },
          {
            type: 'vague-requirements',
            title: 'Vague Requirements',
            description:
              'Uses non-specific language like "demonstrable history" without clear criteria.',
            tip: 'Legitimate jobs specify exact requirements, certifications, and measurable experience.',
          },
          {
            type: 'buzzwords',
            title: 'Excessive Buzzwords',
            description:
              'Overuses personality descriptors like "extremely energetic" instead of focusing on skills.',
            tip: 'Real job descriptions emphasize specific skills, qualifications, and measurable attributes.',
          },
          {
            type: 'missing-contact',
            title: 'Missing Contact Information',
            description:
              'Promises application instructions "separately" without providing immediate contact details.',
            tip: 'Legitimate employers provide clear, immediate contact information and application processes.',
          },
        ]
      } else if (this.scenarioId === 'skynet-sales') {
        this.redFlagExplanations = [
          {
            type: 'vague-application',
            title: 'Vague Application Instructions',
            description:
              'References a "below link" that doesn\'t exist, providing no clear way to apply.',
            tip: 'Real job postings include specific application instructions with working links or contact information.',
          },
          {
            type: 'dynamic-buzzwords',
            title: 'Excessive Personality Buzzwords',
            description:
              'Uses appealing personality descriptors like "dynamic" instead of focusing on genuine qualifications.',
            tip: 'Look for specific skills, experience requirements, and measurable qualifications rather than vague personality traits.',
          },
          {
            type: 'company-history',
            title: 'Unverifiable Company Claims',
            description:
              'Provides specific company history that cannot be easily verified and may be fabricated to create legitimacy.',
            tip: 'Research company claims independently through official websites, business registries, and professional networks.',
          },
          {
            type: 'exaggerated-scope',
            title: 'Exaggerated Business Scope',
            description:
              'Claims of national reach without evidence; scammers often exaggerate their business scope to appear legitimate.',
            tip: 'Verify company size and scope through official business directories and client testimonials.',
          },
          {
            type: 'promotional-language',
            title: 'Overly Promotional Language',
            description:
              'Uses emotionally persuasive language designed to build excitement rather than provide factual information.',
            tip: 'Professional job descriptions focus on factual role details rather than promotional company messaging.',
          },
          {
            type: 'generous-compensation',
            title: 'Overly Generous Compensation Claims',
            description:
              'Makes non-specific but appealing compensation promises that sound too good to be true.',
            tip: 'Legitimate employers provide specific salary ranges and clear compensation structures with verifiable details.',
          },
          {
            type: 'generic-soft-skills',
            title: 'Generic Soft Skills Priority',
            description:
              'Prioritizes generic personality traits over relevant, concrete technical requirements.',
            tip: 'Look for specific technical skills, certifications, and measurable experience requirements.',
          },
          {
            type: 'incomplete-contact',
            title: 'Incomplete Contact Information',
            description:
              'Provides broken contact details that prevent proper verification and can be used to harvest personal data.',
            tip: 'Always verify complete contact information including working email addresses, phone numbers, and physical addresses.',
          },
        ]
      }
    },
  },
}
</script>

<style scoped>
.scenario-container {
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
  font-size: 2.5rem;
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

.hero-actions {
  margin-top: 1.5rem;
}

.job-posting-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.job-posting {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.job-title-section h4 {
  color: #2d3748;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.company-name {
  color: #4a5568;
  font-size: 1.1rem;
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
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 1rem 0;
}

.job-description {
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1rem;
}

.job-requirements,
.job-responsibilities {
  background: #f1f5f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.job-requirements ul,
.job-responsibilities ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.job-requirements li,
.job-responsibilities li {
  margin-bottom: 0.75rem;
  color: #2d3748;
  line-height: 1.5;
}

.application-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f1f5f9;
  border-radius: 0 8px 8px 0;
}

.red-flag-text {
  position: relative;
  transition: all 0.3s ease;
}

.red-flag-text:hover {
  background: rgba(99, 102, 241, 0.1);
  border-radius: 3px;
  padding: 2px 4px;
  margin: -2px -4px;
  cursor: pointer;
}

.red-flag-text.revealed {
  background: linear-gradient(120deg, #ff7675 0%, #d63031 100%);
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  font-weight: 600;
  animation: pulse 2s infinite;
}

.red-flag-text.clicked {
  background: rgba(59, 130, 246, 0.2);
  border-radius: 3px;
  padding: 2px 4px;
  margin: -2px -4px;
  transform: scale(1.02);
}

.clickable-red-flag {
  cursor: pointer !important;
  position: relative;
}

.clickable-red-flag:hover {
  background: rgba(99, 102, 241, 0.15) !important;
  border-radius: 3px;
  padding: 2px 4px;
  margin: -2px -4px;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 118, 117, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 118, 117, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 118, 117, 0);
  }
}

.scenario-actions {
  margin: 2rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.alert {
  background-color: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
}

.alert-info {
  color: #1e40af;
}

.red-flags-explanation {
  margin-top: 3rem;
  padding: 2rem;
  background: #fef2f2;
  border-radius: 12px;
  border-left: 4px solid #dc2626;
}

.explanation-title {
  color: #dc2626;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}

.red-flag-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.red-flag-card {
  background: #ffffff;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s ease;
}

.red-flag-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.flag-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.flag-icon {
  color: #dc2626;
  font-size: 1.25rem;
}

.flag-header h5 {
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.flag-description {
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.flag-tip {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #10b981;
  font-size: 0.9rem;
  color: #374151;
}

.not-found-section {
  padding: 4rem 2rem;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
  margin: 0 auto;
}

.not-found-icon {
  font-size: 4rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  animation: fadeIn 0.3s ease;
}

.red-flag-modal {
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.red-flag-modal .modal-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.red-flag-modal .modal-header h4 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.red-flag-modal .modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.red-flag-modal .modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.red-flag-modal .modal-body {
  padding: 2rem;
}

.flag-explanation {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.explanation-section,
.tip-section {
  padding: 1rem;
  border-radius: 8px;
}

.explanation-section {
  background: #fef2f2;
  border-left: 4px solid #ef4444;
}

.tip-section {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
}

.explanation-section h5,
.tip-section h5 {
  margin: 0 0 0.75rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.explanation-section p,
.tip-section p {
  margin: 0;
  line-height: 1.6;
  color: #4b5563;
}

.red-flag-modal .modal-footer {
  background: #f9fafb;
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
}

.red-flag-modal .btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.red-flag-modal .btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .job-posting-section {
    padding: 2rem 1.5rem;
  }

  .job-posting {
    padding: 1.5rem;
  }

  .job-header {
    flex-direction: column;
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .red-flag-cards {
    grid-template-columns: 1fr;
  }

  .red-flag-modal {
    width: 95%;
    margin: 1rem;
  }

  .red-flag-modal .modal-body {
    padding: 1.5rem;
  }

  .flag-explanation {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem 1rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .job-posting-section {
    padding: 1.5rem 1rem;
  }
}
</style>
