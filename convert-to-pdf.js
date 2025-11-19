const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const PDFDocument = require('pdfkit');

// Initialize markdown parser
const md = new markdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Function to convert markdown to PDF
function markdownToPDF(inputFile, outputFile) {
  try {
    // Read the markdown file
    const markdownContent = fs.readFileSync(inputFile, 'utf-8');

    // Create a PDF document
    const doc = new PDFDocument({
      bufferPages: true,
      margin: 50,
      size: 'A4'
    });

    // Pipe to file
    const stream = fs.createWriteStream(outputFile);
    doc.pipe(stream);

    // Set font for the document
    doc.font('Helvetica');

    // Parse markdown and add to PDF
    const lines = markdownContent.split('\n');
    let inCodeBlock = false;
    let currentSize = 11;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines
      if (!line) {
        doc.moveDown(0.3);
        continue;
      }

      // Handle headers
      if (line.startsWith('# ')) {
        doc.fontSize(24).font('Helvetica-Bold').text(line.substring(2), { underline: false });
        doc.moveDown(0.5);
        currentSize = 11;
      } else if (line.startsWith('## ')) {
        doc.fontSize(16).font('Helvetica-Bold').text(line.substring(3));
        doc.moveDown(0.3);
        currentSize = 11;
      } else if (line.startsWith('### ')) {
        doc.fontSize(13).font('Helvetica-Bold').text(line.substring(4));
        doc.moveDown(0.2);
        currentSize = 11;
      } else if (line.startsWith('- ')) {
        // Bullet points
        doc.fontSize(11).font('Helvetica').text('• ' + line.substring(2), { indent: 20 });
        doc.moveDown(0.2);
        currentSize = 11;
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text
        doc.fontSize(11).font('Helvetica-Bold').text(line.replace(/\*\*/g, ''));
        doc.moveDown(0.2);
        currentSize = 11;
      } else {
        // Regular text
        doc.fontSize(11).font('Helvetica').text(line, { width: 495, align: 'left' });
        doc.moveDown(0.2);
        currentSize = 11;
      }
    }

    // Add page numbers
    const pages = doc.bufferedPageRange().count;
    for (let i = 0; i < pages; i++) {
      doc.switchToPage(i);
      doc.fontSize(9).font('Helvetica').text(`Page ${i + 1} of ${pages}`, 50, doc.page.height - 30, { align: 'center' });
    }

    // Finalize PDF
    doc.end();

    // Handle completion
    stream.on('finish', () => {
      console.log(`✓ Successfully created: ${outputFile}`);
    });

    stream.on('error', (err) => {
      console.error(`✗ Error creating PDF: ${err.message}`);
    });

  } catch (error) {
    console.error(`✗ Error processing ${inputFile}: ${error.message}`);
  }
}

// Convert both documents
const privacyInput = '/home/user/nafasi-website/PRIVACY_POLICY.md';
const privacyOutput = '/home/user/nafasi-website/PRIVACY_POLICY.pdf';
const tosInput = '/home/user/nafasi-website/TERMS_OF_SERVICE.md';
const tosOutput = '/home/user/nafasi-website/TERMS_OF_SERVICE.pdf';

console.log('Converting markdown files to PDF...\n');
markdownToPDF(privacyInput, privacyOutput);
markdownToPDF(tosInput, tosOutput);
