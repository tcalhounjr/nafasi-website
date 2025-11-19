'use client'

import { Box, Container, Heading, Text, VStack, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
            Nafasi, Inc. Privacy Policy
          </Heading>

          <Box>
            <Text fontWeight="bold">Effective Date: November 19, 2025</Text>
            <Text fontWeight="bold">Last Updated: November 19, 2025</Text>
          </Box>

          {/* Section 1: Introduction */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>1. Introduction</Heading>
            <Text mb={4}>
              This Privacy Policy (&quot;Policy&quot;) explains how Nafasi, Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Nafasi&quot;) collects, uses, discloses, and otherwise processes personal information through our corporate website located at nafasi.co and all subdomains thereof (collectively, the &quot;Website&quot;). This Policy applies to all visitors and users of the Website.
            </Text>
            <Text>
              By accessing or using the Website, you agree to the terms of this Privacy Policy. If you do not agree with our practices, please do not use the Website. We are committed to protecting your privacy and maintaining your trust. This Policy is designed to be transparent and compliant with applicable privacy laws, including the California Consumer Privacy Act (CCPA) and the European Union&apos;s General Data Protection Regulation (GDPR).
            </Text>
          </Box>

          {/* Section 2: Information We Collect */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>2. Information We Collect</Heading>

            <Heading as="h3" size="md" mb={3}>2.1 Information You Provide Directly</Heading>
            <Text mb={2}><strong>Contact Information:</strong> When you use our contact forms, subscription forms, or fill out service request forms, we collect information such as your name, email address, phone number, company name, job title, and any other information you choose to provide.</Text>
            <Text mb={2}><strong>Communication Information:</strong> If you email us directly or communicate with us through our chatbot or live chat features, we collect and retain the content of your communications, including attachments, along with metadata such as the date and time of communication.</Text>
            <Text mb={2}><strong>Service Request Information:</strong> When you request a consultation, proposal, or service information, we may collect additional details about your business needs, budget, timeline, project requirements, and preferences to better serve you.</Text>
            <Text mb={2}><strong>Payment Information:</strong> When you make a payment through our Website, payment information (such as credit card details) is processed securely through our payment processor, Stripe. We do not directly store full credit card numbers on our servers. We do retain transaction records, including transaction amounts, dates, and invoice details.</Text>
            <Text mb={4}><strong>Account Information:</strong> If you create an account on our Website, we collect your username, password (encrypted), account preferences, and any profile information you provide.</Text>

            <Heading as="h3" size="md" mb={3}>2.2 Information Collected Automatically</Heading>
            <Text mb={2}><strong>Log Data:</strong> Our servers automatically record information about your interactions with the Website, including your IP address, browser type, operating system, referring URL, pages visited, time and date of access, and duration of visit.</Text>
            <Text mb={2}><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance user experience, remember your preferences, and analyze Website usage patterns. This includes:</Text>
            <Box as="ul" mb={2} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Essential Cookies:</strong> Required for Website functionality</Box>
              <Box as="li" mb={1}><strong>Analytics Cookies:</strong> Used to understand how visitors interact with our Website</Box>
              <Box as="li" mb={1}><strong>Marketing Cookies:</strong> Used to track and display targeted advertisements</Box>
              <Box as="li" mb={1}><strong>Functionality Cookies:</strong> Remember your preferences and settings</Box>
            </Box>
            <Text mb={2}><strong>Device Information:</strong> We may collect information about your device, including device type, model, operating system, and unique device identifiers.</Text>
            <Text mb={4}><strong>Location Information:</strong> If you grant permission, we may collect general geographic information based on IP address. We do not collect precise location data without explicit consent.</Text>

            <Heading as="h3" size="md" mb={3}>2.3 Information from Third Parties</Heading>
            <Text mb={2}><strong>CRM Data:</strong> We integrate with customer relationship management (CRM) platforms that may share information about your business interactions with Nafasi.</Text>
            <Text mb={2}><strong>Marketing Platforms:</strong> If you interact with our content on social media or other third-party platforms, those platforms may provide us with anonymized data about your interactions.</Text>
            <Text mb={4}><strong>Webhooks and APIs:</strong> We receive information from third-party services (including Calendly for scheduling) that integrate with our Website through webhooks and APIs.</Text>
          </Box>

          {/* Section 3: How We Use Your Information */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>3. How We Use Your Information</Heading>

            <Heading as="h3" size="md" mb={3}>3.1 Service Delivery and Performance</Heading>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Providing the services you request (consultations, proposals, project delivery)</Box>
              <Box as="li" mb={1}>Processing payments and generating invoices</Box>
              <Box as="li" mb={1}>Managing your account and access to the Website</Box>
              <Box as="li" mb={1}>Fulfilling obligations under service agreements</Box>
              <Box as="li" mb={1}>Responding to your inquiries and support requests</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>3.2 Communication</Heading>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Sending transactional emails (confirmations, invoices, account updates)</Box>
              <Box as="li" mb={1}>Following up on consultation requests</Box>
              <Box as="li" mb={1}>Notifying you of changes to our services or policies</Box>
              <Box as="li" mb={1}>Providing customer support and technical assistance</Box>
              <Box as="li" mb={1}>Sending newsletters and promotional materials (with your consent)</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>3.3 Marketing and Business Development</Heading>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Understanding your interests to tailor our service offerings</Box>
              <Box as="li" mb={1}>Creating targeted marketing campaigns</Box>
              <Box as="li" mb={1}>Measuring the effectiveness of marketing efforts</Box>
              <Box as="li" mb={1}>Identifying and reaching out to potential clients</Box>
              <Box as="li" mb={1}>Hosting webinars, events, and educational content</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>3.4 Legal and Compliance</Heading>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Complying with applicable laws and regulations</Box>
              <Box as="li" mb={1}>Enforcing our Terms of Service and other agreements</Box>
              <Box as="li" mb={1}>Protecting our rights, privacy, safety, or property</Box>
              <Box as="li" mb={1}>Responding to legal process and government requests</Box>
              <Box as="li" mb={1}>Fraud detection and prevention</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>3.5 Analytics and Improvement</Heading>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Analyzing Website usage patterns and user behavior</Box>
              <Box as="li" mb={1}>Improving Website performance, functionality, and user experience</Box>
              <Box as="li" mb={1}>Conducting research and developing new services</Box>
              <Box as="li" mb={1}>Optimizing marketing campaigns</Box>
              <Box as="li" mb={1}>Creating aggregate, de-identified reports</Box>
            </Box>
          </Box>

          {/* Section 4: Information Sharing */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>4. Information Sharing and Disclosure</Heading>

            <Heading as="h3" size="md" mb={3}>4.1 Service Providers</Heading>
            <Text mb={2}>We share information with third-party service providers who assist us in operating our Website and conducting our business, including:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Payment Processors:</strong> Stripe (for payment processing)</Box>
              <Box as="li" mb={1}><strong>Cloud Hosting:</strong> Supabase (for data storage and authentication)</Box>
              <Box as="li" mb={1}><strong>Email and Communication:</strong> SendGrid, Mailchimp (for email marketing)</Box>
              <Box as="li" mb={1}><strong>CRM Platforms:</strong> HubSpot, Salesforce, Pipedrive (for lead management)</Box>
              <Box as="li" mb={1}><strong>Calendar Integration:</strong> Calendly (for consultation scheduling)</Box>
              <Box as="li" mb={1}><strong>Analytics:</strong> Google Analytics (for Website analytics)</Box>
              <Box as="li" mb={1}><strong>Chatbot Services:</strong> OpenAI (for AI-powered chatbot functionality)</Box>
            </Box>
            <Text mb={4}>These service providers are contractually obligated to use your information only as necessary to provide services to us and maintain the confidentiality and security of your data.</Text>

            <Heading as="h3" size="md" mb={3}>4.2 Business Transfers</Heading>
            <Text mb={4}>If Nafasi, Inc. is involved in a merger, acquisition, bankruptcy, dissolution, reorganization, or similar transaction, your information may be transferred as part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.</Text>

            <Heading as="h3" size="md" mb={3}>4.3 Legal Requirements</Heading>
            <Text mb={2}>We may disclose your information when required by law, court order, or governmental authority, or when we believe in good faith that disclosure is necessary to:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Comply with applicable laws and regulations</Box>
              <Box as="li" mb={1}>Enforce our agreements</Box>
              <Box as="li" mb={1}>Protect our rights, privacy, safety, or property</Box>
              <Box as="li" mb={1}>Prevent fraud or criminal activity</Box>
              <Box as="li" mb={1}>Protect the rights and safety of our users and the public</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>4.4 Your Consent</Heading>
            <Text mb={4}>We may share your information with third parties when you provide explicit consent or direct us to do so.</Text>

            <Heading as="h3" size="md" mb={3}>4.5 Aggregated and De-Identified Information</Heading>
            <Text mb={4}>We may share aggregated, de-identified information that cannot reasonably be used to identify you with third parties for marketing, analytics, research, and other purposes without restriction.</Text>
          </Box>

          {/* Section 5: Your Privacy Rights */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>5. Your Privacy Rights</Heading>

            <Heading as="h3" size="md" mb={3}>5.1 California Consumer Privacy Act (CCPA) Rights</Heading>
            <Text mb={2}>If you are a California resident, you have the following rights under the CCPA:</Text>
            <Text mb={2}><strong>Right to Know:</strong> You have the right to request what personal information we collect, use, and share about you.</Text>
            <Text mb={2}><strong>Right to Delete:</strong> You have the right to request deletion of personal information we have collected from you, subject to certain exceptions.</Text>
            <Text mb={2}><strong>Right to Correct:</strong> You have the right to request that we correct inaccurate personal information we maintain about you.</Text>
            <Text mb={2}><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale or sharing of your personal information.</Text>
            <Text mb={2}><strong>Right to Non-Discrimination:</strong> We will not deny, charge different prices for, or provide different quality of services based on your exercise of these privacy rights.</Text>
            <Text mb={2}><strong>Right to Limit Use:</strong> You have the right to limit our use and disclosure of sensitive personal information to what is necessary to provide the services you request.</Text>
            <Text mb={4}><strong>Verification:</strong> To exercise these rights, contact us at admin@nafasi.co. We will verify your identity before processing your request.</Text>

            <Heading as="h3" size="md" mb={3}>5.2 European Union General Data Protection Regulation (GDPR) Rights</Heading>
            <Text mb={2}>If you are located in the European Union or United Kingdom, you have the following rights under the GDPR:</Text>
            <Text mb={2}><strong>Right of Access:</strong> You have the right to obtain a copy of personal data we hold about you.</Text>
            <Text mb={2}><strong>Right to Rectification:</strong> You have the right to correct inaccurate or incomplete personal data.</Text>
            <Text mb={2}><strong>Right to Erasure:</strong> You have the right to request deletion of your personal data (the &quot;right to be forgotten&quot;).</Text>
            <Text mb={2}><strong>Right to Restrict Processing:</strong> You have the right to request that we limit the processing of your personal data.</Text>
            <Text mb={2}><strong>Right to Data Portability:</strong> You have the right to receive your personal data in a portable format.</Text>
            <Text mb={2}><strong>Right to Object:</strong> You have the right to object to processing of your personal data, including for direct marketing purposes.</Text>
            <Text mb={4}><strong>Right to Lodge a Complaint:</strong> You have the right to lodge a complaint with the applicable data protection authority in your jurisdiction.</Text>

            <Heading as="h3" size="md" mb={3}>5.3 Other Jurisdictions</Heading>
            <Text mb={4}>Residents of other jurisdictions may have additional privacy rights under applicable law. Please contact us for more information about your specific rights.</Text>
          </Box>

          {/* Section 6: Data Security */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>6. Data Security</Heading>
            <Text mb={2}>We implement comprehensive technical and organizational security measures designed to protect your personal information against unauthorized access, alteration, disclosure, and destruction, including:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Encryption:</strong> We use industry-standard SSL/TLS encryption for data in transit</Box>
              <Box as="li" mb={1}><strong>Access Controls:</strong> We implement role-based access controls and require authentication</Box>
              <Box as="li" mb={1}><strong>Data Minimization:</strong> We collect and retain only the information necessary for specified purposes</Box>
              <Box as="li" mb={1}><strong>Regular Audits:</strong> We conduct regular security audits and assessments</Box>
              <Box as="li" mb={1}><strong>Employee Training:</strong> Our employees are trained on data protection and privacy practices</Box>
              <Box as="li" mb={1}><strong>Incident Response:</strong> We maintain procedures for detecting, investigating, and responding to security incidents</Box>
            </Box>
            <Text mb={4}>However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information. You are responsible for maintaining the confidentiality of your account credentials.</Text>
          </Box>

          {/* Section 7: Data Retention */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>7. Data Retention</Heading>
            <Text mb={2}>We retain personal information for the period necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law. Specific retention periods:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Account Information:</strong> Retained while your account is active; deleted within 90 days of account closure</Box>
              <Box as="li" mb={1}><strong>Transaction Records:</strong> Retained for at least 7 years for tax and legal compliance purposes</Box>
              <Box as="li" mb={1}><strong>Marketing Information:</strong> Retained until you unsubscribe</Box>
              <Box as="li" mb={1}><strong>Chatbot Conversations:</strong> Retained for 12 months for quality improvement and dispute resolution</Box>
              <Box as="li" mb={1}><strong>Website Analytics:</strong> Aggregated data retained indefinitely; individual tracking data retained for 24 months</Box>
            </Box>
          </Box>

          {/* Section 8: Children's Privacy */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>8. Children&apos;s Privacy</Heading>
            <Text mb={4}>
              Our Website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information immediately and terminate the child&apos;s account. If you believe we have collected information from a child, please contact us at admin@nafasi.co.
            </Text>
          </Box>

          {/* Section 9: Cookies and Tracking */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>9. Cookies and Tracking Technologies</Heading>
            <Text mb={2}>We use the following types of cookies:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}><strong>Essential Cookies:</strong> Required for Website functionality (these cannot be disabled)</Box>
              <Box as="li" mb={1}><strong>Performance Cookies:</strong> Help us understand how you use our Website (Google Analytics, Hotjar)</Box>
              <Box as="li" mb={1}><strong>Functional Cookies:</strong> Remember your preferences and settings</Box>
              <Box as="li" mb={1}><strong>Advertising Cookies:</strong> Used for targeted advertising on social media and other platforms</Box>
            </Box>
            <Text mb={2}>You can control cookie preferences through your browser settings. To opt-out of specific tracking services, visit:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Google Analytics: <ChakraLink href="https://tools.google.com/dlpage/gaoptout" color="nafasi.green" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</ChakraLink></Box>
              <Box as="li" mb={1}>Hotjar: <ChakraLink href="https://www.hotjar.com/legal/compliance/opt-out" color="nafasi.green" target="_blank" rel="noopener noreferrer">https://www.hotjar.com/legal/compliance/opt-out</ChakraLink></Box>
            </Box>
          </Box>

          {/* Section 10: Third-Party Links */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>10. Third-Party Links</Heading>
            <Text mb={4}>
              Our Website may contain links to third-party websites and services that are not operated by Nafasi. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services before providing your information.
            </Text>
          </Box>

          {/* Section 11: International Data Transfers */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>11. International Data Transfers</Heading>
            <Text mb={2}>
              Nafasi is based in the United States. Information we collect may be transferred to, stored in, and processed in the United States or other countries. If you are located outside the United States, your information may be transferred internationally and may be subject to different data protection laws than those of your country of residence.
            </Text>
            <Text mb={4}>
              For EU/UK residents: We ensure appropriate safeguards are in place for international data transfers, including Standard Contractual Clauses or other legally recognized mechanisms.
            </Text>
          </Box>

          {/* Section 12: Contact Us */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>12. Contact Us</Heading>
            <Text mb={2}>
              If you have questions about this Privacy Policy, wish to exercise your privacy rights, or would like to report a privacy concern, please contact us:
            </Text>
            <Text mb={2}><strong>Nafasi, Inc.</strong></Text>
            <Text mb={2}>Email: <ChakraLink href="mailto:admin@nafasi.co" color="nafasi.green">admin@nafasi.co</ChakraLink></Text>
            <Text mb={2}>Website: <ChakraLink href="https://www.nafasi.co" color="nafasi.green" target="_blank" rel="noopener noreferrer">https://www.nafasi.co</ChakraLink></Text>
            <Text mb={4}>
              We will respond to your inquiry within 30 days (or within 45 days for formal privacy rights requests under CCPA/GDPR).
            </Text>
          </Box>

          {/* Section 13: Changes to This Privacy Policy */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>13. Changes to This Privacy Policy</Heading>
            <Text mb={2}>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other factors. We will notify you of material changes by:
            </Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Posting the updated policy on our Website with a new &quot;Last Updated&quot; date</Box>
              <Box as="li" mb={1}>Sending you an email notification if we have your email address</Box>
              <Box as="li" mb={1}>Requiring your consent to material changes that expand our collection or use of your information</Box>
            </Box>
            <Text mb={4}>
              Your continued use of our Website following the posting of changes constitutes your acceptance of the updated Privacy Policy.
            </Text>
          </Box>

          {/* Section 14: State-Specific Notices */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>14. State-Specific Notices</Heading>

            <Heading as="h3" size="md" mb={3}>14.1 California Privacy Rights Notice</Heading>
            <Text mb={2}>California residents have the right to know what categories of personal information are collected and how it is used. In the past 12 months, we have collected and used the following categories of personal information:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>Identifiers (name, email, phone, address)</Box>
              <Box as="li" mb={1}>Commercial information (purchase history, transaction records)</Box>
              <Box as="li" mb={1}>Internet activity (browsing history, interaction with Website)</Box>
              <Box as="li" mb={1}>Professional information (job title, company, experience level)</Box>
              <Box as="li" mb={1}>Location information (general geographic location from IP address)</Box>
              <Box as="li" mb={1}>Sensory information (if you provide it in communications)</Box>
              <Box as="li" mb={1}>Inferences (profiles created to determine your interests and preferences)</Box>
            </Box>

            <Heading as="h3" size="md" mb={3}>14.2 Virginia, Colorado, Connecticut, and Utah Privacy Rights</Heading>
            <Text mb={4}>
              If you are a resident of Virginia, Colorado, Connecticut, or Utah, you have similar rights to those described in Section 5.1, including rights to access, correct, delete, and port your information, as well as the right to opt-out of targeted advertising.
            </Text>
          </Box>

          {/* Section 15: Compliance with Laws */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>15. Compliance with Laws</Heading>
            <Text mb={2}>This Privacy Policy has been designed with the intention of complying with:</Text>
            <Box as="ul" mb={4} pl={6} css={{ listStyleType: "disc", listStylePosition: "outside" }}>
              <Box as="li" mb={1}>California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA)</Box>
              <Box as="li" mb={1}>European Union General Data Protection Regulation (GDPR)</Box>
              <Box as="li" mb={1}>United Kingdom General Data Protection Regulation (UK GDPR)</Box>
              <Box as="li" mb={1}>Virginia Consumer Data Protection Act (VCDPA)</Box>
              <Box as="li" mb={1}>Colorado Privacy Act (CPA)</Box>
              <Box as="li" mb={1}>Connecticut Data Privacy Act (CTDPA)</Box>
              <Box as="li" mb={1}>Utah Consumer Privacy Act (UCPA)</Box>
              <Box as="li" mb={1}>Other applicable privacy laws and regulations</Box>
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
