const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Firebase Auth + MongoDB API",
      version: "1.0.0",
      description: "API doc cho hệ thống xác thực dùng Firebase và MongoDB",
    },
    servers: [
      {
        url: "https://giasuai-be.onrender.com",
        description: "Render Production Server",
      },
      {
        url: "http://localhost:4000",
        description: "Local development",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64e74c9d3e41df00127d25a3",
            },
            firebaseUid: {
              type: "string",
              example: "a1b2c3d4e5f6g7h8",
            },
            email: {
              type: "string",
              example: "example@gmail.com",
            },
            fullName: {
              type: "string",
              example: "Nguyễn Văn A",
            },
            phoneNumber: {
              type: "string",
              example: "0123456789",
            },
            role: {
              type: "string",
              enum: ["student", "tutor"],
              example: "student",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-21T12:34:56.789Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2025-07-21T12:34:56.789Z",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // <-- Đảm bảo đúng path
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
