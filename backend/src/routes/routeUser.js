const router = require('express').Router();
const { user } = require('../controllers');

// ------------------- CRUD USER -------------------
// GET localhost:8080/user => Ambil data semua user
router.get('/user', user.getDataUser);
// GET localhost:8080/user/2 => Ambil data semua user berdasarkan id = 2
router.get('/user/:id', user.getDataUserByID);
// GET localhost:8080/user/email => Ambil data semua user berdasarkan email
router.get('/user/email/:email', user.getDataUserByEmail);
// POST localhost:8080/user/add => Tambah data user ke database
router.post('/user/add', user.addDataUser);
// POST localhost:8080/user/2 => Edit data user
router.post('/user/edit', user.editDataUser);
// POST localhost:8080/user/delete => Delete data user
router.post('/user/delete/', user.deleteDataUser);
// ------------------- CRUD USER -------------------

// GET localhost:8080/quotation/2 => Ambil data semua quotation berdasarkan id = 2
router.get('/quotation/item/:idI', user.getQuotationByIDUser);


// ------------------- CRUD PROJECTS -------------------
// GET localhost:8080/user => Ambil data semua user
router.get('/projects', user.getDataProjects);
// GET localhost:8080/user => Ambil data semua user
router.get('/projects/approved', user.getDataProjectsApproved);
// GET localhost:8080/user/2 => Ambil data semua user berdasarkan id = 2
router.get('/projects/:id', user.getDataProjectsByID);
// GET localhost:8080/user/2 => Ambil data semua user berdasarkan id_user
router.get('/projects/user/:id', user.getDataProjectsByUserID);
// POST localhost:8080/user/add => Tambah data user ke database
router.post('/projects/add', user.addDataProjects);
// POST localhost:8080/user/2 => Edit data user
router.post('/projects/edit', user.editDataProjects);
// POST localhost:8080/user/2 => Edit data user
router.post('/projects/status/edit', user.editStatusProjects);
// POST localhost:8080/user/delete => Delete data user
router.post('/projects/delete/', user.deleteDataProjects);
// ------------------- CRUD PROJECTS -------------------

// ------------------- CRUD ITEMS -------------------
// GET localhost:8080/user => Ambil data semua user
router.get('/items', user.getDataItems);
// GET localhost:8080/user/2 => Ambil data semua user berdasarkan id = 2
router.get('/items/:id', user.getDataItemsByID);
// GET localhost:8080/items/project/2 => Ambil data semua user berdasarkan projet id
router.get('/items/project/:id', user.getDataItemsByProjectID);
// GET localhost:8080/user/2 => Ambil data semua user berdasarkan id = 2
router.get('/items/project/approved/:idP/:idU', user.getDataItemsByProjectIDApproved);
// POST localhost:8080/user/add => Tambah data user ke database
router.post('/items/add', user.addDataItems);
// POST localhost:8080/user/2 => Edit data user
router.post('/items/edit', user.editDataItems);
// POST localhost:8080/user/2 => Edit data user
router.post('/items/status/edit', user.editStatusItems);
// POST localhost:8080/user/delete => Delete data user
router.post('/items/delete/', user.deleteDataItems);
// ------------------- CRUD ITEMS -------------------

// ------------------- CRUD QUOTATION -------------------
// GET localhost:8080/quotation => Ambil data semua quotation
router.get('/quotation', user.getDataQuotation);
// GET localhost:8080/quotation/2 => Ambil data semua quotation berdasarkan id = 2
router.get('/quotation/quote/:id', user.getDataQuotationByIDItem);
// POST localhost:8080/quotation/add => Tambah data quotation ke database
router.post('/quotation/add', user.addDataQuotation);
// POST localhost:8080/quotation/2 => Edit data quotation
router.post('/quotation/edit/', user.editDataQuotation);
// POST localhost:8080/quotation/2 => Edit data quotation
router.post('/quotation/status/edit/', user.editStatusQuotation);
// GET localhost:8080/quotation/2 => Ambil data semua quotation berdasarkan id = 2
router.get('/quotation/:idUser/:idItem', user.getDataIDUser);
// POST localhost:8080/quotation/delete => Delete data quotation
router.post('/quotation/delete/', user.deleteDataQuotation);
// ------------------- CRUD QUOTATION -------------------

// ------------------- DLL ------------------------------
// GET localhost:8080/quotation => Ambil data semua quotation
router.get('/accepted', user.getDataAccepted);
router.get('/quote/:idQ', user.getDataMyQuote);
// POST localhost:8080/user/2 => Edit data user
router.post('/quotation/edit/status', user.editItemStatus);

module.exports = router;