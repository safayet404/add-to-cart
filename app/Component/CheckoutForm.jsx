import React, { useState, useEffect } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const CheckoutForm = ({ carts }) => {

    const initialFormData = {
        name: "",
        email: "",
        company: "",
        region: "",
        address: "",
        phone: "",
        shippingName: "",
        shippingEmail: "",
        shippingAddress: ""
    }

    const [orderData, setOrderData] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [invoiceVisible, setInvoiceVisible] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = JSON.parse(localStorage.getItem('carts')) || [];
            setCart(storedCart);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderDatas = {
            ...formData,
            cart
        };
        setOrderData(orderDatas);

        setFormData(initialFormData);
        setInvoiceVisible(true);
    };

    const totalPrice = cart.reduce((total, product) => total + product.price, 0).toFixed(2);

    const generateInvoice = async () => {
        if (!formData || !cart.length) {
            return null;
        }

        const pdfDoc = await PDFDocument.create();
        let page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 12;
        const rowHeight = 20;

        let y = height - 50;

        page.drawText('Thank you for your order. Your order is being processed', { x: 20, y, size: fontSize, font });
        y -= rowHeight * 2;

        page.drawText('Description', { x: 20, y, size: fontSize, font });
        page.drawText('Quantity', { x: 220, y, size: fontSize, font });
        page.drawText('Price', { x: 320, y, size: fontSize, font });
        y -= rowHeight;

        cart.forEach((product) => {
            if (y < 50) {
                page = pdfDoc.addPage();
                y = height - 50;
            }
            page.drawText(product.title, { x: 20, y, size: fontSize, font });
            page.drawText("x1", { x: 220, y, size: fontSize, font });
            page.drawText(`$${product.price.toFixed(2)}`, { x: 320, y, size: fontSize, font });
            y -= rowHeight;
        });

        page.drawLine({
            start: { x: 20, y: y - 10 },
            end: { x: width - 20, y: y - 10 },
            thickness: 1,
            color: rgb(0, 0, 0),
        });

        y -= rowHeight;
        page.drawText('Total:', { x: 20, y, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(`$${totalPrice}`, { x: 320, y, size: fontSize, font, color: rgb(0, 0, 0) });

        y -= rowHeight;
        const shippingCharge = 10;
        page.drawText('Shipping Charge:', { x: 20, y, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(`$${shippingCharge.toFixed(2)}`, { x: 320, y, size: fontSize, font, color: rgb(0, 0, 0) });

        y -= rowHeight;
        page.drawText('Billing Address:', { x: 20, y, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(`${formData.name}\n${formData.email}\n${formData.address}`, { x: 20, y: y - 40, size: fontSize, font, color: rgb(0, 0, 0) });

        page.drawText('Shipping Address:', { x: 320, y, size: fontSize, font, color: rgb(0, 0, 0) });
        page.drawText(`${formData.shippingName}\n${formData.shippingEmail}\n${formData.shippingAddress}`, { x: 320, y: y - 40, size: fontSize, font, color: rgb(0, 0, 0) });

        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    };

    const downloadInvoice = async () => {
        try {
            if (!orderData || !orderData.name || !orderData.email || !orderData.address) {
                throw new Error('Incomplete order information');
            }

            if (!cart.length) {
                throw new Error('No items in the cart');
            }

            const pdfBytes = await generateInvoice();

            if (!pdfBytes) {
                throw new Error('Failed to generate invoice');
            }

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'invoice.pdf';
            link.click();

            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading invoice:', error.message);
        }
    };

    return (
        <div className='grid grid-cols-2 place-items-center'>

            <div class="bg-white-200 rounded shadow-md p-4 w-1/2 mt-16 mb-8">
                <h2 class="text-lg font-bold mb-4 text-center">Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>

                    <div class="mb-4">
                        <label for="card" class="block text-sm font-medium text-gray-700">Company</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="card" class="block text-sm font-medium text-gray-700">Region</label>
                        <input type="text" id="region" name="region" value={formData.region} onChange={handleChange} class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="card" class="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="card" class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    </div>

                    <button type="submit" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
                </form>

            </div>
            <div className="bg-white-200 rounded shadow-lg p-4">
                <h2 class="text-lg font-bold mb-4 text-center">Order Summary</h2>
                {cart?.length > 0 && cart?.map((product) => (
                    <div key={product?.id} className="items-center grid grid-cols-3">

                        <div className="card-body py-3 px-4 col-span-full grid grid-cols-2">
                            <div className="flex-grow">  <h5 className="card-title font-normal inter-font text-md">
                                {product.title}
                            </h5>
                            </div>
                            <div className="text-right">  <h4 className="font-bold text-[#F2415A] inter-font text-md">
                                ${product.price}
                            </h4>
                            </div>
                        </div>




                    </div>
                ))}

                <hr />

                <div className="card-body py-3 px-4 col-span-full grid grid-cols-2">
                    <div className="flex-grow">  <h5 className="card-title font-normal inter-font text-md">
                        Subtotal
                    </h5>
                    </div>
                    <div className="text-right">  <h4 className="font-bold text-[#F2415A] inter-font text-md">

                        {totalPrice}
                    </h4>
                    </div>
                </div>

                <hr />
                <div className="card-body py-3 px-4 col-span-full grid grid-cols-2">
                    <div className="flex-grow">  <h5 className="card-title font-normal inter-font text-md">
                        Shipping
                    </h5>
                    </div>
                    <div className="text-right">  <h4 className="font-bold text-[#F2415A] inter-font text-md">

                        Free
                    </h4>
                    </div>
                </div>
                <hr />
                <div className="card-body py-3 px-4 col-span-full grid grid-cols-2">
                    <div className="flex-grow">  <h5 className="card-title font-normal inter-font text-md">
                        Total
                    </h5>
                    </div>
                    <div className="text-right">  <h4 className="font-bold text-[#F2415A] inter-font text-md">

                        {totalPrice}
                    </h4>
                    </div>
                </div>

                {invoiceVisible && (
                    <div className="max-w-lg mx-auto w-1/2 mt-4 text-center">

                        <button onClick={downloadInvoice} className="bg-red-500 p-2 rounded text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Download Invoice</button>
                    </div>
                )}
                {/* <div className="text-center ">
                   <button className='bg-red-500 p-2 rounded text-white'>Place Order</button>
                </div> */}
            </div>






        </div>

    );
};

export default CheckoutForm;
