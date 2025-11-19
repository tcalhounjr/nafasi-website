'use client'

import { Box, Container, Heading, Text, VStack, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <Box minH="100vh" bg="gray.900" color="white" py={20}>
      <Container maxW="4xl">
        <VStack align="start" gap={8}>
          {/* Header */}
          <Box>
            <ChakraLink as={Link} href="/" color="nafasi.green" _hover={{ textDecoration: 'underline' }}>
              ← Back to Home
            </ChakraLink>
          </Box>

          <Heading as="h1" size="2xl" color="nafasi.green">
            Nafasi, Inc. Terms of Service
          </Heading>

          <Box>
            <Text fontWeight="bold">Effective Date: November 19, 2025</Text>
            <Text fontWeight="bold">Last Updated: November 19, 2025</Text>
          </Box>

          {/* Section 1: Introduction */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>1. Introduction and Agreement to Terms</Heading>
            <Text mb={4}>
              Welcome to nafasi.co and all of its subdomains (the &quot;Website&quot;), operated by Nafasi, Inc., a technology consulting company specializing in AI-driven solutions for small-to-medium businesses (SMBs) and marginalized communities (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Nafasi&quot;).
            </Text>
            <Text mb={4}>
              These Terms of Service (&quot;Terms,&quot; &quot;Agreement,&quot; or &quot;ToS&quot;) constitute a legally binding agreement between you and Nafasi, Inc. that governs your access to and use of our Website, including all content, services, products, and features offered through the Website (collectively, the &quot;Service&quot;). This Agreement also governs any consultation services, project work, products, and professional services we provide to you.
            </Text>
            <Text mb={4}>
              <strong>By accessing, browsing, or using the Website in any way, including creating an account, submitting a contact form, requesting a consultation, making a payment, or downloading content, you acknowledge that you have read, understood, and agree to be bound by all terms and conditions of this Agreement.</strong> If you do not agree to these Terms, you must immediately cease using the Website and our Services.
            </Text>
            <Text>
              This Agreement is effective when you first access the Website and remains in effect until terminated as described in Section 8.
            </Text>
          </Box>

          {/* Section 2: Acceptance of Terms */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>2. Acceptance of Terms and Modifications</Heading>

            <Heading as="h3" size="md" mb={3}>2.1 Binding Agreement</Heading>
            <Text mb={2}>By using the Website or Services, you represent and warrant that:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>You are at least 18 years of age</Box>
              <Box as="li" mb={1}>You have the legal authority to enter into a binding agreement</Box>
              <Box as="li" mb={1}>You agree to be bound by these Terms</Box>
              <Box as="li" mb={1}>You will comply with all applicable laws and regulations in your jurisdiction</Box>
              <Box as="li" mb={1}>Your use of the Service is not prohibited by law or court order</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>2.2 Right to Modify Terms</Heading>
            <Text mb={2}>Nafasi reserves the right to modify these Terms at any time in our sole discretion. We will notify you of material changes through:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>A notice posted prominently on our Website with an updated &quot;Last Updated&quot; date</Box>
              <Box as="li" mb={1}>An email notification to your registered email address (if you have an account)</Box>
              <Box as="li" mb={1}>A banner or popup alert on the Website</Box>
            </Box>
            <Text mb={4}>
              <strong>Your continued use of the Website or Services after the posting of modifications constitutes your acceptance of the updated Terms.</strong> We recommend that you review these Terms periodically to ensure you understand the current terms governing your use.
            </Text>

            <Heading as="h3" size="md" mb={3}>2.3 Precedence</Heading>
            <Text mb={2}>If any conflict exists between these Terms and any other agreement you have with Nafasi, the following order of precedence applies:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Service-specific statements and addendums (e.g., consulting agreements)</Box>
              <Box as="li" mb={1}>These Terms of Service</Box>
              <Box as="li" mb={1}>The Privacy Policy</Box>
            </Box>
          </Box>

          {/* Section 3: User Conduct */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>3. User Conduct and Restrictions</Heading>

            <Heading as="h3" size="md" mb={3}>3.1 Acceptable Use</Heading>
            <Text mb={2}>You agree to use the Website and Services only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the Website. Prohibited behavior includes:</Text>

            <Text fontWeight="bold" mb={2}>Illegal Activities:</Text>
            <Box as="ul" mb={3} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Violating any applicable local, state, national, or international law or regulation</Box>
              <Box as="li" mb={1}>Engaging in fraudulent, deceptive, or misleading conduct</Box>
              <Box as="li" mb={1}>Creating, distributing, or assisting in the distribution of malware, spyware, or other harmful code</Box>
              <Box as="li" mb={1}>Hacking, phishing, or attempting to gain unauthorized access to systems</Box>
              <Box as="li" mb={1}>Money laundering or financing of illegal activities</Box>
              <Box as="li" mb={1}>Child exploitation or abuse</Box>
            </Box>

            <Text fontWeight="bold" mb={2}>Harmful Conduct:</Text>
            <Box as="ul" mb={3} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Transmitting threats, harassment, hate speech, or abusive content</Box>
              <Box as="li" mb={1}>Defaming, libeling, or damaging the reputation of any person or entity</Box>
              <Box as="li" mb={1}>Creating multiple accounts to circumvent our policies or terms</Box>
              <Box as="li" mb={1}>Impersonating any person or organization</Box>
              <Box as="li" mb={1}>Stalking, doxing, or engaging in coordinated harassment campaigns</Box>
            </Box>

            <Text fontWeight="bold" mb={2}>Spam and Abuse:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Sending unsolicited commercial messages or advertisements</Box>
              <Box as="li" mb={1}>Posting repetitive, unwanted, or spam content</Box>
              <Box as="li" mb={1}>Overloading servers with requests or denial-of-service (DoS) attacks</Box>
              <Box as="li" mb={1}>Bot scraping or automated harvesting of data without permission</Box>
              <Box as="li" mb={1}>Interfering with the normal operation of the Website</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>3.2 Account Responsibilities</Heading>
            <Text mb={2}>If you create an account on our Website, you are responsible for:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Maintaining the confidentiality of your login credentials (username and password)</Box>
              <Box as="li" mb={1}>All activities and transactions that occur under your account</Box>
              <Box as="li" mb={1}>Immediately notifying us if you suspect unauthorized access</Box>
              <Box as="li" mb={1}>Accepting full responsibility for the consequences of credential sharing</Box>
              <Box as="li" mb={1}>Complying with all applicable laws while using your account</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>3.3 User-Generated Content</Heading>
            <Text mb={2}>If you submit, post, or transmit any content through the Website, you:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Represent that you own or have obtained all necessary rights to the content</Box>
              <Box as="li" mb={1}>Grant Nafasi a non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and display the content for our business purposes</Box>
              <Box as="li" mb={1}>Warrant that the content does not infringe any third-party intellectual property rights</Box>
              <Box as="li" mb={1}>Assume full responsibility for the accuracy and legality of the content</Box>
              <Box as="li" mb={1}>Release Nafasi from any liability related to your content</Box>
            </Box>
          </Box>

          {/* Section 4: Intellectual Property */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>4. Intellectual Property Rights</Heading>

            <Heading as="h3" size="md" mb={3}>4.1 Website Content Ownership</Heading>
            <Text mb={4}>
              All content on the Website, including but not limited to text, graphics, logos, images, audio clips, video clips, digital downloads, data compilations, and software (&quot;Website Content&quot;), is the exclusive property of Nafasi, Inc. or its content suppliers and is protected by United States and international copyright laws, trademark laws, and other intellectual property laws.
            </Text>
            <Text mb={4}>
              The &quot;Nafasi&quot; name, logo, design elements, color scheme, and associated brand identity are trademarks and service marks of Nafasi, Inc. All rights reserved.
            </Text>

            <Heading as="h3" size="md" mb={3}>4.2 Limited License</Heading>
            <Text mb={2}>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Access and view Website Content for your personal, non-commercial use</Box>
              <Box as="li" mb={1}>Download individual items of Website Content for personal reference</Box>
              <Box as="li" mb={1}>Print one copy of Website Content for your personal use</Box>
            </Box>

            <Text mb={2}><strong>This license does not permit you to:</strong></Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Modify, adapt, translate, or create derivative works of Website Content</Box>
              <Box as="li" mb={1}>Republish, resell, or redistribute Website Content</Box>
              <Box as="li" mb={1}>Remove any copyright notices or proprietary markings</Box>
              <Box as="li" mb={1}>Use Website Content for commercial purposes without authorization</Box>
              <Box as="li" mb={1}>Frame or deep-link to Website Content</Box>
              <Box as="li" mb={1}>Combine Website Content with other materials or services</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>4.3 Client Work and Deliverables</Heading>
            <Text mb={2}>For consulting services and project work:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Intellectual Property Created:</strong> Unless otherwise specified in a separate Service Agreement, intellectual property created by Nafasi specifically for your project (&quot;Work Product&quot;) becomes your exclusive property upon final payment.</Box>
              <Box as="li" mb={1}><strong>Nafasi Methodology:</strong> Nafasi retains all rights to its general methodologies, templates, processes, and intellectual property used in service delivery (not custom-created for you).</Box>
              <Box as="li" mb={1}><strong>Attribution:</strong> You may display Nafasi work samples and case studies only with our written permission and appropriate attribution.</Box>
            </Box>
          </Box>

          {/* Section 5: Disclaimer of Warranties */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>5. Disclaimer of Warranties</Heading>

            <Heading as="h3" size="md" mb={3}>5.1 &quot;AS-IS&quot; Provision</Heading>
            <Text mb={2}>
              THE WEBSITE AND SERVICES ARE PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS. NAFASI EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
            </Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Warranty of merchantability</Box>
              <Box as="li" mb={1}>Warranty of fitness for a particular purpose</Box>
              <Box as="li" mb={1}>Warranty of title</Box>
              <Box as="li" mb={1}>Warranty of non-infringement</Box>
              <Box as="li" mb={1}>Warranty of accuracy or completeness</Box>
              <Box as="li" mb={1}>Warranty of reliability or availability</Box>
              <Box as="li" mb={1}>Warranty that services will be uninterrupted or error-free</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>5.2 No Representation</Heading>
            <Text mb={2}>We do not represent or warrant that:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>The Website will meet your expectations or requirements</Box>
              <Box as="li" mb={1}>The Website will be available at all times without interruption</Box>
              <Box as="li" mb={1}>Website Content is accurate, complete, or current</Box>
              <Box as="li" mb={1}>Any errors or defects will be corrected</Box>
              <Box as="li" mb={1}>The Website is free from viruses, malware, or other harmful components</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>5.3 User Responsibility</Heading>
            <Text mb={2}>Your use of the Website and Services is entirely at your own risk. You assume full responsibility for:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Determining whether the Services are suitable for your needs</Box>
              <Box as="li" mb={1}>Protecting your device from malware and security threats</Box>
              <Box as="li" mb={1}>Maintaining backups of your data</Box>
              <Box as="li" mb={1}>Compliance with applicable laws in your jurisdiction</Box>
            </Box>
          </Box>

          {/* Section 6: Limitation of Liability */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>6. Limitation of Liability</Heading>

            <Heading as="h3" size="md" mb={3}>6.1 Excluded Damages</Heading>
            <Text mb={2}>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL NAFASI, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR CONTENT PROVIDERS BE LIABLE FOR ANY:
            </Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Indirect, incidental, special, consequential, punitive, or exemplary damages</Box>
              <Box as="li" mb={1}>Loss of profits, revenue, business opportunities, or goodwill</Box>
              <Box as="li" mb={1}>Loss of data, information, or productivity</Box>
              <Box as="li" mb={1}>Cost of substitute services or goods</Box>
              <Box as="li" mb={1}>Interruption of business or operations</Box>
              <Box as="li" mb={1}>Damages arising from your reliance on Website Content or Services</Box>
            </Box>
            <Text mb={4}><strong>This limitation applies even if Nafasi has been advised of the possibility of such damages.</strong></Text>

            <Heading as="h3" size="md" mb={3}>6.2 Liability Cap</Heading>
            <Text mb={4}>
              Except where prohibited by law, Nafasi&apos;s total cumulative liability for any claims arising out of or related to these Terms or your use of the Website and Services shall not exceed the amount you have paid to Nafasi in the 12 months preceding the claim, or $100, whichever is less.
            </Text>

            <Heading as="h3" size="md" mb={3}>6.3 Exceptions</Heading>
            <Text mb={2}>These limitations do not apply to:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Your indemnification obligations under Section 7</Box>
              <Box as="li" mb={1}>Violations of intellectual property rights</Box>
              <Box as="li" mb={1}>Claims that cannot be limited under applicable law</Box>
              <Box as="li" mb={1}>Damages arising from gross negligence, fraud, or willful misconduct</Box>
            </Box>
          </Box>

          {/* Section 7: Indemnification */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>7. Indemnification</Heading>
            <Text mb={2}>
              You agree to indemnify, defend, and hold harmless Nafasi, Inc., its affiliates, officers, directors, employees, agents, and third-party providers from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from or related to:
            </Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Your use of the Website or Services</Box>
              <Box as="li" mb={1}>Your violation of these Terms</Box>
              <Box as="li" mb={1}>Your violation of any applicable law or regulation</Box>
              <Box as="li" mb={1}>Your infringement of any third-party intellectual property rights</Box>
              <Box as="li" mb={1}>Your user-generated content</Box>
              <Box as="li" mb={1}>Your interactions with other users or third parties</Box>
              <Box as="li" mb={1}>Claims arising from your account or credentials</Box>
            </Box>
          </Box>

          {/* Section 8: Termination */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>8. Termination</Heading>

            <Heading as="h3" size="md" mb={3}>8.1 Termination by You</Heading>
            <Text mb={2}>You may terminate your account at any time by:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Logging into your account and selecting the account deletion option, or</Box>
              <Box as="li" mb={1}>Contacting us at admin@nafasi.co with a written request to delete your account</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>8.2 Termination by Nafasi</Heading>
            <Text mb={2}>Nafasi may suspend or terminate your account or access to the Website immediately and without notice if:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>You materially violate these Terms or any other agreement with Nafasi</Box>
              <Box as="li" mb={1}>You engage in conduct that Nafasi reasonably determines violates law or policy</Box>
              <Box as="li" mb={1}>You use the Website for illegal or unauthorized purposes</Box>
              <Box as="li" mb={1}>Payments are declined or fail</Box>
              <Box as="li" mb={1}>You harass, threaten, or abuse other users or Nafasi staff</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>8.3 Effects of Termination</Heading>
            <Text mb={2}>Upon termination:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Your license to use the Website and Services immediately ceases</Box>
              <Box as="li" mb={1}>Any outstanding payments remain due and payable</Box>
              <Box as="li" mb={1}>Sections of these Terms that are intended to survive termination continue in effect</Box>
              <Box as="li" mb={1}>We will not refund prepaid fees unless otherwise required by law</Box>
            </Box>
          </Box>

          {/* Section 9: Payment and Billing */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>9. Payment and Billing</Heading>

            <Heading as="h3" size="md" mb={3}>9.1 Fees and Pricing</Heading>
            <Text mb={2}>Nafasi offers various services and consultation options with different pricing models. All fees are:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Listed in USD (United States Dollars)</Box>
              <Box as="li" mb={1}>Exclusive of applicable taxes unless otherwise stated</Box>
              <Box as="li" mb={1}>Subject to change with 30 days&apos; written notice</Box>
              <Box as="li" mb={1}>Non-refundable except as expressly provided in these Terms or applicable law</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>9.2 Payment Processing</Heading>
            <Text mb={2}>Payments are processed through Stripe, our authorized payment processor. By providing payment information, you:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Authorize Nafasi to charge your payment method for services rendered</Box>
              <Box as="li" mb={1}>Represent that you are the authorized user of the payment method</Box>
              <Box as="li" mb={1}>Agree to pay all charges incurred</Box>
              <Box as="li" mb={1}>Consent to secure storage of payment information for future transactions</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>9.3 Refund Policy</Heading>
            <Text mb={2}><strong>Refunds are available under the following circumstances only:</strong></Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Defective Services:</strong> If Nafasi fails to provide contracted services, a proportional refund may be issued</Box>
              <Box as="li" mb={1}><strong>Legal Requirement:</strong> If required by law</Box>
              <Box as="li" mb={1}><strong>Service Cancellation:</strong> If Nafasi cancels a service before completion, a refund of unused fees is issued</Box>
            </Box>
            <Text mb={2}><strong>Refunds are NOT available for:</strong></Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Services that have been partially or fully rendered</Box>
              <Box as="li" mb={1}>Changes in mind or dissatisfaction</Box>
              <Box as="li" mb={1}>Deposits or retainers</Box>
              <Box as="li" mb={1}>Consulting hours that have been used</Box>
              <Box as="li" mb={1}>Completed project deliverables</Box>
            </Box>
          </Box>

          {/* Section 10: Governing Law */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>10. Governing Law and Dispute Resolution</Heading>

            <Heading as="h3" size="md" mb={3}>10.1 Governing Law</Heading>
            <Text mb={4}>
              These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. You consent to the exclusive jurisdiction of the state and federal courts located in California for any disputes.
            </Text>

            <Heading as="h3" size="md" mb={3}>10.2 Dispute Resolution Process</Heading>
            <Text mb={2}><strong>Before pursuing legal action, you agree to attempt good faith resolution:</strong></Text>
            <Text fontWeight="bold" mb={2}>Step 1: Informal Resolution</Text>
            <Box as="ul" mb={3} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Contact us at admin@nafasi.co describing the dispute in detail</Box>
              <Box as="li" mb={1}>We will respond within 30 days with our position</Box>
              <Box as="li" mb={1}>Good faith negotiation will occur for an additional 30 days</Box>
            </Box>

            <Text fontWeight="bold" mb={2}>Step 2: Mediation</Text>
            <Text mb={2}>If informal resolution fails, either party may initiate non-binding mediation.</Text>

            <Text fontWeight="bold" mb={2}>Step 3: Litigation</Text>
            <Text mb={4}>If mediation is unsuccessful, you may pursue legal action in the courts of California.</Text>

            <Heading as="h3" size="md" mb={3}>10.3 Class Action Waiver</Heading>
            <Text mb={4}>
              <strong>You and Nafasi agree that any dispute shall be pursued individually, not as a class action.</strong> You waive the right to participate in any class action, class arbitration, or representative action against Nafasi.
            </Text>

            <Heading as="h3" size="md" mb={3}>10.4 Limitation Period</Heading>
            <Text mb={4}>
              Any legal action or proceeding must be commenced within one (1) year after the cause of action arises, or it will be forever barred.
            </Text>
          </Box>

          {/* Section 11: Privacy Policy */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>11. Privacy Policy</Heading>
            <Text mb={4}>
              Your use of the Website is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. Please review the Privacy Policy carefully.
            </Text>
            <Text>
              <strong>Privacy Policy:</strong> <ChakraLink as={Link} href="/privacy-policy" color="nafasi.green">nafasi.co/privacy-policy</ChakraLink>
            </Text>
          </Box>

          {/* Section 12: Third-Party Services */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>12. Third-Party Services and Links</Heading>

            <Heading as="h3" size="md" mb={3}>12.1 Third-Party Integrations</Heading>
            <Text mb={2}>Our Website integrates with third-party services, including:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Payment processor (Stripe)</Box>
              <Box as="li" mb={1}>Hosting and database (Supabase)</Box>
              <Box as="li" mb={1}>Email services (SendGrid, Mailchimp)</Box>
              <Box as="li" mb={1}>Scheduling (Calendly)</Box>
              <Box as="li" mb={1}>CRM platforms (HubSpot, Salesforce, Pipedrive)</Box>
              <Box as="li" mb={1}>Analytics (Google Analytics)</Box>
              <Box as="li" mb={1}>AI services (OpenAI)</Box>
            </Box>
            <Text mb={4}>Your use of these services is subject to their terms of service and privacy policies. Nafasi is not responsible for third-party services.</Text>

            <Heading as="h3" size="md" mb={3}>12.2 Third-Party Links</Heading>
            <Text mb={2}>The Website may contain links to external websites. We do not endorse or assume responsibility for:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Third-party website content</Box>
              <Box as="li" mb={1}>Security practices of third parties</Box>
              <Box as="li" mb={1}>Compliance with laws</Box>
              <Box as="li" mb={1}>Privacy practices</Box>
            </Box>
          </Box>

          {/* Section 13: Accessibility */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>13. Accessibility</Heading>
            <Text mb={4}>
              Nafasi is committed to making the Website accessible to individuals with disabilities. If you encounter accessibility barriers or have questions about accessibility, please contact us at <ChakraLink href="mailto:admin@nafasi.co" color="nafasi.green">admin@nafasi.co</ChakraLink>.
            </Text>
          </Box>

          {/* Section 14: General Provisions */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>14. General Provisions</Heading>

            <Heading as="h3" size="md" mb={3}>14.1 Entire Agreement</Heading>
            <Text mb={4}>
              These Terms, together with the Privacy Policy and any service-specific agreements, constitute the entire agreement between you and Nafasi regarding your use of the Website and Services, superseding all prior and contemporaneous agreements, understandings, and negotiations.
            </Text>

            <Heading as="h3" size="md" mb={3}>14.2 Severability</Heading>
            <Text mb={4}>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full effect.
            </Text>

            <Heading as="h3" size="md" mb={3}>14.3 Assignment</Heading>
            <Text mb={4}>
              These Terms are binding on you and your heirs, successors, and assigns. You may not assign these Terms without Nafasi&apos;s written consent. Nafasi may assign these Terms to any successor or affiliate.
            </Text>

            <Heading as="h3" size="md" mb={3}>14.4 Notices</Heading>
            <Text mb={2}>All notices, requests, and other communications required under these Terms should be sent to:</Text>
            <Text mb={2}><strong>Nafasi, Inc.</strong></Text>
            <Text mb={2}>Email: <ChakraLink href="mailto:admin@nafasi.co" color="nafasi.green">admin@nafasi.co</ChakraLink></Text>
            <Text mb={4}>Website: <ChakraLink href="https://www.nafasi.co" color="nafasi.green" isExternal>https://www.nafasi.co</ChakraLink></Text>
          </Box>

          {/* Section 15: Contact Information */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>15. Contact Information</Heading>
            <Text mb={2}>For questions, concerns, or disputes regarding these Terms of Service, please contact:</Text>
            <Text mb={2}><strong>Nafasi, Inc.</strong></Text>
            <Text mb={2}>Email: <ChakraLink href="mailto:admin@nafasi.co" color="nafasi.green">admin@nafasi.co</ChakraLink></Text>
            <Text mb={4}>Website: <ChakraLink href="https://www.nafasi.co" color="nafasi.green" isExternal>https://www.nafasi.co</ChakraLink></Text>
            <Text mb={4}>We commit to responding to inquiries within 5-7 business days.</Text>
          </Box>

          {/* Section 16: Acknowledgment */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>16. Acknowledgment</Heading>
            <Text mb={2}><strong>BY USING THE WEBSITE AND SERVICES, YOU ACKNOWLEDGE THAT:</strong></Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>You have read and understood these Terms of Service</Box>
              <Box as="li" mb={1}>You agree to be bound by all terms and conditions</Box>
              <Box as="li" mb={1}>You understand the limitations on our liability</Box>
              <Box as="li" mb={1}>You have adequate remedies under these Terms</Box>
              <Box as="li" mb={1}>You waive any claims not brought within one year</Box>
            </Box>
          </Box>

          {/* Footer */}
          <Box borderTop="1px solid" borderColor="whiteAlpha.300" pt={8} width="100%">
            <Text fontSize="sm" color="gray.500" textAlign="center" mb={2}>
              © {new Date().getFullYear()} Nafasi, Inc. All Rights Reserved.
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center" fontStyle="italic">
              Engineering Equity - Building technology that serves everyone.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
