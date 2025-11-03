const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listCourses(req, res, next) {
  try {
    const courses = await prisma.course.findMany({
      include: { instructor: { select: { id: true, email: true, name: true } } }
    });
    res.json(courses);
  } catch (err) { next(err); }
}

async function createCourse(req, res, next) {
  try {
    const { title, description, published } = req.body;
    const instructorId = req.user.id; // set by authenticateJWT
    const course = await prisma.course.create({
      data: { title, description, published: !!published, instructorId }
    });
    res.status(201).json(course);
  } catch (err) { next(err); }
}

module.exports = { listCourses, createCourse };
