const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

// HEROKU POSTGRE
const { Client } = require('pg');
const client = new Client({
connectionString: process.env.DATABASE_URL,
ssl: {
    rejectUnauthorized: false
}
});

client.connect();


pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // ------------------- CRUD USER -------------------
    // Ambil data semua user
    getDataUser(req,res){
        client.query('SELECT * FROM user;', (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
            client.end();
        });
    },
    // Ambil data user berdasarkan ID
    getDataUserByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user WHERE user_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Ambil data user berdasarkan email
    getDataUserByEmail(req,res){
        let email = req.params.email;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user WHERE email = ?;
                `
            , [email],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data user
    addDataUser(req,res){
        let data = {
            name : req.body.name,
            company : req.body.company,
            email : req.body.email,
            phone_number : req.body.phone_number,
            role : req.body.role,
            password : req.body.password
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO user SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data user
    editDataUser(req,res){
        let dataEdit = {
            name : req.body.name,
            company : req.body.company,
            email : req.body.email,
            phone_number : req.body.phone_number,
            role : req.body.role
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE user SET ? WHERE user_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data user
    deleteDataUser(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM user WHERE user_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    },
    // ------------------- CRUD USER -------------------
    
    // ------------------- CRUD PROJECTS -------------------
    // Ambil data semua projects
    getDataProjects(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM projects;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data semua projects
    getDataProjectsApproved(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT user.company, projects.name, projects.projects_id FROM projects INNER JOIN user ON projects.id_user = user.user_id WHERE projects.status = "approved";
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data projects berdasarkan ID
    getDataProjectsByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM projects WHERE projects_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Ambil data projects berdasarkan User ID
    getDataProjectsByUserID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM projects WHERE id_user = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data projects
    addDataProjects(req,res){
        let data = {
            name : req.body.name,
            status : req.body.status,
            id_user : req.body.id_user
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO projects SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data projects
    editDataProjects(req,res){
        let dataEdit = {
            name : req.body.name
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE projects SET ? WHERE projects_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Update data projects
    editStatusProjects(req,res){
        let dataEdit = {
            status : req.body.status
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE projects SET ? WHERE projects_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data projects
    deleteDataProjects(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM projects WHERE projects_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    },
    // ------------------- CRUD PROJECTS -------------------
    
    // ------------------- CRUD ITEMS -------------------
    // Ambil data semua items
    getDataItems(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM items;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data items berdasarkan ID
    getDataItemsByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM items WHERE items_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Ambil data items berdasarkan ID
    getDataItemsByProjectID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM items WHERE project_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Ambil data items berdasarkan ID
    getDataItemsByProjectIDApproved(req,res){
        let idProject = req.params.idP;
        let idUser = req.params.idU;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM items WHERE status = "approved" AND project_id = ?;
                `
            , [idProject],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data items
    addDataItems(req,res){
        let data = {
            name : req.body.name,
            technology : req.body.technology,
            material : req.body.material,
            surface_finish : req.body.surface_finish,
            quantity : req.body.quantity,
            status : req.body.status,
            quotation : req.body.quotation,
            project_id : req.body.project_id
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO items SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data items
    editDataItems(req,res){
        let dataEdit = {
            name : req.body.name,
            technology : req.body.technology,
            material : req.body.material,
            surface_finish : req.body.surface_finish,
            quantity : req.body.quantity,
            project_id : req.body.project_id
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE items SET ? WHERE items_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Update data items
    editStatusItems(req,res){
        let dataEdit = {
            status : req.body.status,
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE items SET ? WHERE items_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data items
    deleteDataItems(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM items WHERE items_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    },
    // ------------------- CRUD ITEMS -------------------

    // Ambil data semua Accepted
    getDataMyQuote(req,res){
        let idq = req.params.idQ;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT projects.name as project, c.name, c.company, c.price, c.status, projects.projects_id FROM (SELECT b.company, b.name, b.price, b.status, items.project_id FROM (SELECT user.company, a.name, a.price, a.status, a.id_user, a.id_item, a.quotation_id FROM (SELECT quotation.price, quotation.id_item, quotation.id_user, quotation.quotation_id, quotation.name, quotation.status FROM quotation WHERE quotation.id_user = ?) a INNER JOIN user ON a.id_user = user.user_id) b INNER JOIN items ON items.items_id = b.id_item) c INNER JOIN projects ON projects.projects_id = c.project_id;
                `
            , [idq],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
   
    // ------------------- CRUD QUOTATION -------------------
    // Ambil data semua quotation
    getDataQuotation(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM quotation;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data quotation berdasarkan ID
    getDataQuotationByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM quotation WHERE quotation_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Ambil data quotation berdasarkan IDItem
    getDataQuotationByIDItem(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT user.company, a.price, a.id_user, a.quotation_id FROM (SELECT quotation.price, quotation.id_item, quotation.id_user, quotation.quotation_id FROM quotation WHERE quotation.status = "approved") a INNER JOIN user ON a.id_user = user.user_id WHERE a.id_item = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data quotation
    addDataQuotation(req,res){
        let data = {
            name : req.body.name,
            technology : req.body.technology,
            material : req.body.material,
            surface_finish : req.body.surface_finish,
            quantity : req.body.quantity,
            price : req.body.price,
            reason : req.body.reason,
            status : req.body.status,
            id_item : req.body.id_item,
            id_user : req.body.id_user
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO quotation SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data!',
                });
            });
            connection.release();
        })
    },
    // Update data quotation
    editDataQuotation(req,res){
        let dataEdit = {
            name : req.body.name,
            technology : req.body.technology,
            material : req.body.material,
            surface_finish : req.body.surface_finish,
            quantity : req.body.quantity,
            price : req.body.price,
            reason : req.body.reason,
            status : req.body.status,
            id_item : req.body.id_item,
            id_user : req.body.id_user
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE quotation SET ? WHERE quotation_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Update data quotation
    editStatusQuotation(req,res){
        let idUser = req.body.idUser
        let statusA = req.body.statusA
        let statusB = req.body.statusB
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE quotation SET quotation.status = (CASE WHEN (quotation.id_user = ?) THEN ? ELSE ? END) WHERE quotation.id_item = ?;
                `
            , [idUser, statusA, statusB, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Ambil data quotation berdasarkan IDUser
    getDataIDUser(req,res){
        let idUser = req.params.idUser
        let idItem = req.params.idItem
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM (SELECT * FROM quotation WHERE id_user = ?) a WHERE a.id_item = ?;
                `
            , [idUser, idItem],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Delete data quotation
    deleteDataQuotation(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM quotation WHERE quotation_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data!'
                });
            });
            connection.release();
        })
    },
    // ------------------- CRUD QUOTATION -------------------

    // ------------------- DLL ------------------------------
    // Ambil data semua Accepted
    getDataAccepted(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT projects.name as project, c.name, c.company, c.price, c.status, projects.projects_id FROM (SELECT b.company, b.name, b.price, b.status, items.project_id FROM (SELECT user.company, a.name, a.price, a.status, a.id_user, a.id_item, a.quotation_id FROM (SELECT quotation.price, quotation.id_item, quotation.id_user, quotation.quotation_id, quotation.name, quotation.status FROM quotation WHERE quotation.status = "accepted") a INNER JOIN user ON a.id_user = user.user_id) b INNER JOIN items ON items.items_id = b.id_item) c INNER JOIN projects ON projects.projects_id = c.project_id;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data quotation berdasarkan ID
    getQuotationByIDUser(req,res){
        let id = req.params.idI;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM quotation WHERE id_user = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data!',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Update data items
    editItemStatus(req,res){
        let dataEdit = {
            status : req.body.status,
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE quotation SET ? WHERE quotation_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
}