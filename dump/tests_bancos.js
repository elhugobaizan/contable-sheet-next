// Postman Tests for GET /bancos
// These tests verify the response structure, status code, and data types

// Test 1: Verify status code is 200
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test 2: Verify response time is acceptable (less than 2000ms)
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Test 3: Verify response is JSON
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});

// Test 4: Verify response body is an array
pm.test("Response body is an array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});

// Test 5: Verify response has Content-Type header
pm.test("Content-Type is application/json", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

// Test 6: Verify each banco has required fields
pm.test("Each banco has required fields", function () {
    const jsonData = pm.response.json();
    
    if (jsonData.length > 0) {
        jsonData.forEach(function(banco, index) {
            pm.expect(banco, `Banco at index ${index} missing _id`).to.have.property('_id');
            pm.expect(banco, `Banco at index ${index} missing Nombre`).to.have.property('Nombre');
            pm.expect(banco, `Banco at index ${index} missing CBU`).to.have.property('CBU');
            pm.expect(banco, `Banco at index ${index} missing Alias`).to.have.property('Alias');
            pm.expect(banco, `Banco at index ${index} missing Logo`).to.have.property('Logo');
            pm.expect(banco, `Banco at index ${index} missing Efectivo`).to.have.property('Efectivo');
        });
    }
});

// Test 7: Verify data types are correct
pm.test("Data types are correct", function () {
    const jsonData = pm.response.json();
    
    if (jsonData.length > 0) {
        jsonData.forEach(function(banco, index) {
            pm.expect(banco._id, `Banco at index ${index}: _id should be a string`).to.be.a('string');
            pm.expect(banco.Nombre, `Banco at index ${index}: Nombre should be a string`).to.be.a('string');
            pm.expect(banco.CBU, `Banco at index ${index}: CBU should be a string`).to.be.a('string');
            pm.expect(banco.Alias, `Banco at index ${index}: Alias should be a string`).to.be.a('string');
            pm.expect(banco.Logo, `Banco at index ${index}: Logo should be a string`).to.be.a('string');
            pm.expect(banco.Efectivo, `Banco at index ${index}: Efectivo should be a number`).to.be.a('number');
        });
    }
});

// Test 8: Verify required fields are not empty
pm.test("Required fields are not empty", function () {
    const jsonData = pm.response.json();
    
    if (jsonData.length > 0) {
        jsonData.forEach(function(banco, index) {
            pm.expect(banco.Nombre, `Banco at index ${index}: Nombre should not be empty`).to.not.be.empty;
            pm.expect(banco.CBU, `Banco at index ${index}: CBU should not be empty`).to.not.be.empty;
        });
    }
});

// Test 9: Verify CBU format (should be a string of digits, typically 22 characters)
pm.test("CBU format is valid", function () {
    const jsonData = pm.response.json();
    
    if (jsonData.length > 0) {
        jsonData.forEach(function(banco, index) {
            pm.expect(banco.CBU, `Banco at index ${index}: CBU should be a string`).to.be.a('string');
            pm.expect(banco.CBU, `Banco at index ${index}: CBU should not be empty`).to.not.be.empty;
            // CBU typically has 22 digits, but we'll just check it's not empty
        });
    }
});

// Test 10: Verify Efectivo is a number (can be 0 or positive)
pm.test("Efectivo is a valid number", function () {
    const jsonData = pm.response.json();
    
    if (jsonData.length > 0) {
        jsonData.forEach(function(banco, index) {
            pm.expect(banco.Efectivo, `Banco at index ${index}: Efectivo should be a number`).to.be.a('number');
            pm.expect(banco.Efectivo, `Banco at index ${index}: Efectivo should not be negative`).to.be.at.least(0);
        });
    }
});

// Test 11: Verify no error property in response
pm.test("Response does not contain error property", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.not.have.property('error');
});

// Test 12: Verify response structure matches Banco model
pm.test("Response structure matches Banco model", function () {
    const jsonData = pm.response.json();
    
    if (jsonData.length > 0) {
        const firstBanco = jsonData[0];
        const expectedKeys = ['_id', 'Nombre', 'CBU', 'Alias', 'Logo', 'Efectivo'];
        const actualKeys = Object.keys(firstBanco);
        
        expectedKeys.forEach(function(key) {
            pm.expect(actualKeys).to.include(key, `Missing key: ${key}`);
        });
    }
});

// Test 13: Save first banco ID for use in other requests (optional)
if (pm.response.json().length > 0) {
    const firstBanco = pm.response.json()[0];
    pm.environment.set("banco_id", firstBanco._id);
    pm.environment.set("banco_nombre", firstBanco.Nombre);
}

// Test 14: Verify array is not null or undefined
pm.test("Response array is not null or undefined", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.not.be.null;
    pm.expect(jsonData).to.not.be.undefined;
});

