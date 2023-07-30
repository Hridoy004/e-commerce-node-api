const Contact = require('../schemas/contact');

const { v4: uuidv4 } = require("uuid");
const Product = require("../schemas/products");

const addContact = async (req, res) => {
    const { name, email, message } = req.body;

    let contact = new Contact({
        _id: uuidv4(),
        name: name,
        email: email,
        message: message
    });

    contact = await contact.save();

    if (contact) {
        let response = {
            Message: "Successful",
            Success: true,
        };
        res.status(200).send(response);
    } else {
        let response = {
            Message: "Contact can not be created",
            Success: false,
        };
        res.status(400).json(response);
    }
};

const getContact = async (req, res) => {
    const contactList = await Contact.find();

    if (!contactList) {
        let response = {
            Success: false,
            Status: 400
        }
        res.status(400).json(response);
    } else {
        res.status(200).send(contactList);
    }
}


const getContactById = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(500).json({ success: false });
    }
    res.send(contact);
}


module.exports = {
    addContact: addContact,
    getContact: getContact,
    getContactById: getContactById
};

