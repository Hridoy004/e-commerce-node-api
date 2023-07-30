const Contact = require('../schemas/contact');

const deleteContactId = async (req, res) => {
    Contact.findByIdAndRemove(req.params.id).then(users => {
        let response = {
            Message: 'The contact is deleted!',
            Success: true
        }
        if (users) {
            return res.status(200).json(response);
        } else {

            let response = {
                Message: 'Contact not found!',
                Success: false
            }
            return res.status(404).json(response);
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    })
}

module.exports = deleteContactId;