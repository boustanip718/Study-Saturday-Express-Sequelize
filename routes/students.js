const router = require('express').Router();
const Student = require('../db/models/student');

//GET: /students
router.get('/', async (req, res, next) => {
   try {
      const students = await Student.findAll();
      res.send(students);
   }
   catch(err) {
      next(err);
   }
});

//GET: /students/:id
router.get('/:id', async (req, res, next) => {
   try {
      const student = await Student.findById(req.params.id);
      if (student === null) {
         res.status(404).send('you dun messed up');
      }
      res.send(student);
   }
   catch(err) {
      next(err);
   }
});

router.post('/', async(req, res, next) => {
   try {
      const student = await Student.create(req.body);
      res.status(201).send(student); //201 is creating new, 200 is an OK, 404 not found, 500 server side error
   }
   catch(err) {
      next(err);
   }
});

router.put('/:id', async(req, res, next) => {
   try {
      const updateStudent = await Student.update(req.body, { where: { id: req.params.id },
      returning: true,
      plain: true
      });
      // let updatedStudentInfo = await Student.findById(req.params.id);
      // res.send(updatedStudentInfo);

      res.send(student);
   }
   catch(err) {
      next(err);
   }
});

router.delete('/:id', async(req, res, next) => {
   try {
      await Student.destroy({
         where: { id = req.params.id }
      });
      res.sendStatus(204);
      // res.status(204).send('some big shit');
   }
   catch(err) {
      next(err);
   }
});

module.exports = router;
