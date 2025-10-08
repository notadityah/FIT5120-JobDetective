<template>
  <div class="scenario-container">
    <!-- Hero Section -->
    <ScenarioHero :title="scenarioData.title" :intro="scenarioData.intro" @go-back="goBack" />

    <!-- Job Posting Section -->
    <section class="job-posting-section" v-if="scenarioData.jobPosting">
      <div class="container">
        <!-- Enhanced Instructions Section -->
        <ScenarioInstructions />

        <!-- Progress Indicator -->
        <ScenarioProgress
          :discovered-count="discoveredCount"
          :total-red-flags="totalRedFlags"
          :progress-percentage="progressPercentage"
        />

        <!-- Job Posting Mock-up -->
        <JobPosting
          :job-posting="scenarioData.jobPosting"
          :processed-description="processedDescription"
          :processed-application="processedApplication"
          :add-clickable-highlights="addClickableHighlights"
          @highlight-click="handleHighlightClick"
        />

        <!-- Action Buttons -->
        <ScenarioActions
          :red-flags-revealed="redFlagsRevealed"
          @reveal-red-flags="revealRedFlags"
          @go-back="goBack"
        />

        <!-- Red Flags Explanation (shown after reveal) -->
        <RedFlagsExplanation
          :red-flags-revealed="redFlagsRevealed"
          :red-flag-explanations="redFlagExplanations"
        />
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
    <RedFlagModal
      :show="showRedFlagModal"
      :current-red-flag="selectedRedFlag"
      @close="closeRedFlagModal"
    />

    <!-- Simplified Congratulations Modal -->
    <CongratulationsModal
      :show="showCongratulationsModal"
      :total-red-flags="totalRedFlags"
      :completion-skills="completionSkills"
      @close="closeCongratulationsModal"
      @try-another="tryAnotherScenario"
      @go-back="goBackToSimulations"
    />
  </div>
</template>

<script>
import ScenarioHero from '@/components/scenario/ScenarioHero.vue'
import ScenarioInstructions from '@/components/scenario/ScenarioInstructions.vue'
import ScenarioProgress from '@/components/scenario/ScenarioProgress.vue'
import JobPosting from '@/components/scenario/JobPosting.vue'
import ScenarioActions from '@/components/scenario/ScenarioActions.vue'
import RedFlagsExplanation from '@/components/scenario/RedFlagsExplanation.vue'
import RedFlagModal from '@/components/scenario/RedFlagModal.vue'
import CongratulationsModal from '@/components/scenario/CongratulationsModal.vue'

export default {
  name: 'ScenarioView',
  components: {
    ScenarioHero,
    ScenarioInstructions,
    ScenarioProgress,
    JobPosting,
    ScenarioActions,
    RedFlagsExplanation,
    RedFlagModal,
    CongratulationsModal,
  },
  data() {
    return {
      redFlagsRevealed: false,
      showRedFlagModal: false,
      showCongratulationsModal: false,
      selectedRedFlag: {},
      discoveredFlags: new Set(),
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
            application: `To Apply: <span class="red-flag-text" data-flag="incomplete-contact">E-mail resume and cover letter with salary requirements.</span>`,
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
    totalRedFlags() {
      // Count all unique red flags in the current scenario by checking the HTML content
      if (!this.scenarioData.jobPosting) return 0

      const allContent = [
        this.scenarioData.jobPosting.description || '',
        this.scenarioData.jobPosting.application || '',
        ...(this.scenarioData.jobPosting.requirements || []),
        ...(this.scenarioData.jobPosting.responsibilities || []),
      ].join(' ')

      const flagMatches = allContent.match(/data-flag="([^"]+)"/g) || []
      const uniqueFlags = new Set(flagMatches.map((match) => match.match(/data-flag="([^"]+)"/)[1]))

      return uniqueFlags.size
    },
    discoveredCount() {
      return this.discoveredFlags.size
    },
    progressPercentage() {
      if (this.totalRedFlags === 0) return 0
      return Math.round((this.discoveredCount / this.totalRedFlags) * 100)
    },
    completionSkills() {
      if (this.scenarioId === 'engineering-manager') {
        return [
          'Identifying emotional manipulation tactics',
          'Recognizing unrealistic empowerment claims',
          'Spotting vague career promises',
          'Detecting incomplete application processes',
        ]
      } else if (this.scenarioId === 'healthcare-manager') {
        return [
          'Identifying vague application instructions',
          'Recognizing generic company claims',
          'Spotting excessive buzzwords',
          'Detecting missing contact information',
        ]
      } else if (this.scenarioId === 'skynet-sales') {
        return [
          'Identifying unverifiable company claims',
          'Recognizing promotional manipulation language',
          'Spotting incomplete contact information',
          'Detecting exaggerated business scope claims',
        ]
      }
      return []
    },
  },
  mounted() {
    this.setupRedFlagExplanations()

    // Add keyboard accessibility
    document.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    // Clean up event listener
    document.removeEventListener('keydown', this.handleKeydown)
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
      // Make red flag text clickable and keyboard accessible
      return html.replace(
        /<span class="red-flag-text" data-flag="([^"]+)">([^<]+)<\/span>/g,
        '<span class="red-flag-text clickable-red-flag" data-flag="$1" style="cursor: pointer;" tabindex="0" role="button" aria-label="Click to learn about this red flag">$2</span>',
      )
    },
    handleHighlightClick(event) {
      if (event.target.classList.contains('red-flag-text')) {
        const flagType = event.target.getAttribute('data-flag')
        if (flagType && this.redFlagDefinitions[flagType]) {
          const redFlagDef = this.redFlagDefinitions[flagType]
          this.selectedRedFlag = {
            text: event.target.textContent,
            explanation: redFlagDef.description,
            tip: redFlagDef.tip,
            severity: 'high',
          }
          this.showRedFlagModal = true

          // Track discovered flags
          this.discoveredFlags.add(flagType)

          // Add permanent red highlight when clicked - with debugging
          console.log('Adding discovered class to:', event.target)
          event.target.classList.add('discovered')

          // Force a style update
          event.target.style.background = 'linear-gradient(120deg, #ef4444 0%, #dc2626 100%)'
          event.target.style.color = 'white'
          event.target.style.padding = '3px 6px'
          event.target.style.borderRadius = '4px'
          event.target.style.fontWeight = '600'
          event.target.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.3)'

          // Add temporary click feedback
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
    closeCongratulationsModal() {
      this.showCongratulationsModal = false
    },
    tryAnotherScenario() {
      this.showCongratulationsModal = false

      // Reset progress state
      this.resetScenarioState()

      // Get available scenarios excluding the current one
      const allScenarios = Object.keys(this.scenarios)
      const otherScenarios = allScenarios.filter((id) => id !== this.scenarioId)

      if (otherScenarios.length > 0) {
        // Navigate to a random other scenario
        const randomScenario = otherScenarios[Math.floor(Math.random() * otherScenarios.length)]
        this.$router.push(`/simulation/scenario/${randomScenario}`)
      } else {
        // If no other scenarios, go back to simulations
        this.goBackToSimulations()
      }
    },
    resetScenarioState() {
      // Reset all progress-related state
      this.redFlagsRevealed = false
      this.showRedFlagModal = false
      this.showCongratulationsModal = false
      this.selectedRedFlag = {}
      this.discoveredFlags = new Set()

      // Remove any visual red flag highlights from previous scenario
      setTimeout(() => {
        const redFlags = document.querySelectorAll('.red-flag-text')
        redFlags.forEach((el) => {
          el.classList.remove('revealed', 'discovered', 'clicked')
          el.style.background = ''
          el.style.color = ''
          el.style.padding = ''
          el.style.borderRadius = ''
          el.style.fontWeight = ''
          el.style.boxShadow = ''
        })
      }, 100)
    },
    goBackToSimulations() {
      this.$router.push('/simulation')
    },
    handleKeydown(event) {
      // Close modal with Escape key
      if (event.key === 'Escape' && this.showRedFlagModal) {
        this.closeRedFlagModal()
      }

      // Handle Enter and Space for red flag text elements
      if (
        (event.key === 'Enter' || event.key === ' ') &&
        event.target.classList.contains('red-flag-text')
      ) {
        event.preventDefault()
        this.handleHighlightClick(event)
      }
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
  watch: {
    // Reset state when switching scenarios
    scenarioId() {
      this.resetScenarioState()
      this.setupRedFlagExplanations()
    },
    // Add a watcher to check if all flags are discovered
    discoveredCount(newCount) {
      if (newCount === this.totalRedFlags && newCount > 0) {
        // Show congratulations modal after a short delay
        setTimeout(() => {
          this.showCongratulationsModal = true
        }, 1000) // 1 second delay for better UX
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

.job-posting-section {
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
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
  color: #64748b;
  margin-bottom: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .job-posting-section {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .job-posting-section {
    padding: 1.5rem 1rem;
  }
}
</style>
