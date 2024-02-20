import request from 'supertest'
import app from '../app.js'
import mongoose from 'mongoose'


afterAll(async ()=>{
    await mongoose.disconnect()
})

describe("Applicant Profile routes", ()=>{
    let testId;

    test("GET /applicantprofile/retrieve ==> should return json", async ()=>{
        return request(app)
            .get("/applicantprofile/retrieve")
            .expect('Content-type', /json/)
            .expect(200)
            .then((res)=>{
                if (res.error) throw new Error("Error: "+ res.error)
            })
    })

    test("POST /applicantprofile/create ==> should return status true", async ()=>{
        return request(app)
            .post("/applicantprofile/create")
            .set({'Content-Type': 'application/x-www-form-urlencoded'})
            .send({
                firstName: "Jest",
                lastName: "Supertest" 
            })
            .expect('Content-type', /json/)
            .expect(201)
            .then((res)=>{
                expect(res.body.status).toBe(true)
                expect(res.body._id).not.toBeUndefined()
                testId = res.body._id
                if (res.error) throw new Error("Error: "+ res.error)
            })
    })

    test("POST /applicantprofile/update ==> should return status true", async()=>{
        return request(app)
        .post("/applicantprofile/update")
        .set({'Content-Type': 'application/json'})
        .send({
            _id: testId,
            set: {
                education: [
                    {
                        schoolName: "Test University",
                        degree: "Bachelor",
                        program: "Computer Science",
                        startDate: "2021",
                        endDate: "2025",
                        grade: "1.75"
                    }
                ]
            }
        })
        .expect('Content-type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body.status).toBe(true)
        })
    })

    test("POST /applicantprofile/delete ==> should return status true", async()=>{
        return request(app)
        .post("/applicantprofile/delete")
        .set({'Content-Type': 'application/x-www-form-urlencoded'})
        .send({
            _id: testId
        })
        .expect('Content-type', /json/)
        .expect(200)
        .then((res)=>{
            expect(res.body.status).toBe(true)
            if (res.error) throw new Error("Error: "+ res.error)
        })
    })
})
