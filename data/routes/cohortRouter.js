const express = require("express")
const router = express.Router()
const nodeDB = require("../knex-db/knexDB")

 router.get('/', (req, res) => {
 nodeDB
  .pull()
  .then((cohorts) => {
   res
   .json(cohorts)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error pulling all cohorts from DB."})
  })
})

 router.get('/:id', (req, res) => {
 const { id } = req.params
 if (id) { 
  nodeDB
   .pullById(id)
   .then((cohort) => {
    res
     .json(cohort)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error pulling specific cohort from DB."})
   })
  }
})

 router.get('/:id/students', (req, res) => {
 const { id } = req.params
 if (id) {
  nodeDB
   .pullByCohortId(id)
   .then((students) => {
    let newStudents = Object.assign([], students)
     newStudents.filter((student) => {
      return student.name === id
     })
    console.log(newStudents)
    res
     .json(newStudents)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was error retrieving students in cohort."})
   })
 }
})

 router.post('/', (req, res) => {
 const cohort = req.body
  if (cohort.name && cohort.track) {
  nodeDB
   .place(cohort)
   .then(() => {
    res
     .status(201)
     .json(cohort)
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error adding cohort to DB."})
   })
  }
})

 router.put('/:id', (req, res) => {
 const { id } = req.params
 const cohort = req.body
 if (id && cohort.name && cohort.track) {
  nodeDB
   .alter(id, cohort)
   .then(() => {
    res
     .status(201)
     .json({message: "Cohort was succesfully altered in DB."})
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error altering cohort in DB."})
   })
  }
})

 router.delete('/:id', (req, res) => {
 const { id } = req.params
 if (id) {
  nodeDB
   .clear(id)
   .then(() => {
    res
     .json({message: "Cohort was successfully cleared from DB."})
   })
   .catch(() => {
    res
     .status(500)
     .json({error: "There was an error clearing cohort from DB."})
   })
 }
})

 module.exports = router 