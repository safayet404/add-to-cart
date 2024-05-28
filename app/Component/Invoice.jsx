import { PDFDocument, rgb } from 'pdf-lib';

const Invoice = ({ formData, cart, totalPrice }) => {
  const generateInvoice = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([500, 500]);

    // Set up the font and font size
    const font = await pdfDoc.embedFont(PDFLibStandardFonts.Helvetica);
    page.setFont(font);

    // Add content to the PDF
    page.drawText(`Invoice`, {
      x: 50,
      y: 450,
      size: 24,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Name: ${formData.name}`, {
      x: 50,
      y: 400,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${formData.email}`, {
      x: 50,
      y: 375,
      size: 12,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Address: ${formData.address}`, {
      x: 50,
      y: 350,
      size: 12,
      color: rgb(0, 0, 0),
    });

    let y = 300;
    cart.forEach((product) => {
      page.drawText(`Product: ${product.title}`, {
        x: 50,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      y -= 25;
    });

    page.drawText(`Total Price: $${totalPrice}`, {
      x: 50,
      y: 50,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Convert bytes to a Blob
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return pdfUrl;
  };

  return (
    <div>
      <button onClick={generateInvoice}>Download Invoice</button>
    </div>
  );
};

export default Invoice;
