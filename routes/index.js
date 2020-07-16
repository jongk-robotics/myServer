module.exports = function(app, Contact)
{
    // GET ALL BOOKS
    app.get('/api/contacts', function(req,res){
        Contact.find(function(err, contacts){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(contacts);
        })
    });

    // GET SINGLE BOOK
    app.get('/api/contacts/:contact_id', function(req, res){
        Contact.findOne({_id: req.params.contact_id}, function(err, contact){
            if(err) return res.status(500).json({error: err});
            if(!contact) return res.status(404).json({error: 'contact not found'});
            res.json(contact);
        })
    });

    // GET BOOK BY AUTHOR
    app.get('/api/contacts/name/:name', function(req, res){
        Contact.find({name: req.params.name},  function(err, contacts){
            if(err) return res.status(500).json({error: err});
            if(contacts.length === 0) return res.status(404).json({error: 'contact not found'});
            res.json(contacts);
        })
    });

    app.get('/api/contacts/number/:number', function(req, res){
        Contact.find({number: req.params.number},  function(err, contacts){
            if(err) return res.status(500).json({error: err});
            if(contacts.length === 0) return res.status(404).json({error: 'contact not found'});
            res.json(contacts);
        })
    });

    // CREATE BOOK
    app.post('/api/contacts', function(req, res){
        var contact = new Contact();
        contact.name = req.body.name;
        contact.number = req.body.number;

        contact.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    // UPDATE THE BOOK
    app.put('/api/contacts/:contact_id', function(req, res){
        Contact.update({ _id: req.params.contact_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'contact not found' });
            res.json( { message: 'contact updated' } );
        })
    /* [ ANOTHER WAY TO UPDATE THE BOOK ]
            Contact.findById(req.params.book_id, function(err, contact){
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!contact) return res.status(404).json({ error: 'contact not found' });

            if(req.body.title) contact.title = req.body.title;
            if(req.body.author) contact.author = req.body.author;
            if(req.body.published_date) contact.published_date = req.body.published_date;

            contact.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'contact updated'});
            });

        });
    */
    });

    // DELETE BOOK
    app.delete('/api/contacts/:contact_id', function(req, res){
        Contact.remove({ _id: req.params.contact_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "contact not found" });
            res.json({ message: "contact deleted" });
            */

            res.status(204).end();
        })
    });

    app.delete('/api/contacts', function(req, res){
        Contact.remove({ }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "contact not found" });
            res.json({ message: "contact deleted" });
            */

            res.status(204).end();
        })
    });
     
}
