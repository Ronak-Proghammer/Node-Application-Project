import { Router } from "express";
import con from "./database/db-connection.js"; // Import database connection
import getRandomGreeting from "./modules/module.js"; // Import random greeting module
const router = Router();

// Route for home page
router.get("/", (req, res) => {
  res.render("index", {
    title: "Index - Valorant",
    currentPage: "index",
    greeting: getRandomGreeting(),
  });
});

// Route for agents page
router.get("/agents", (req, res) => {
  res.render("agents", { title: "Agents", currentPage: "agents" });
});

// Route for specs page
router.get("/specs", (req, res) => {
  res.render("specs", { title: "Specs", currentPage: "specs" });
});

// Route for contact us page with optional ID parameter
router.get("/contact-us/:id?", (req, res) => {
  const id = req.params.id;
  // true if this is an update route
  if (id) {
    try {
      // Query database to get user info by ID
      con.query(
        "SELECT * FROM userinfo WHERE user_id = ?",
        [id],
        (error, result) => {
          if (error) throw error;
          res.render("contactUS", {
            title: "Contact Us",
            currentPage: "contactus",
            pageCss: "contactUs",
            userInfo: result[0], // Pass user info if found
          });
        }
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Server Error");
    }
  } else {
    // Render blank contact form if no ID is provided
    res.render("contactUS", {
      title: "Contact Us",
      currentPage: "contactus",
      pageCss: "contactUs",
      userInfo: "", // No user info
    });
  }
});

// Handle contact form submission (POST request)
router.post("/contact", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    city,
    province,
    postal_code,
    feedback_message,
    update_info,
  } = req.body;

  try {
    // Check if the email already exists in the database
    con.query(
      "SELECT * FROM userinfo WHERE email = ?",
      [email],
      (err, result) => {
        if (err) {
          console.error("Error checking existing data:", err);
          res.status(500).send("An error occurred while submitting the form.");
          return;
        }

        let rows = JSON.parse(JSON.stringify(result));
        if (rows.length > 0) {
          // If the user exists, update the info or feedback message
          if (update_info) {
            // Checking if user wants to update contact information
            con.query(
              "UPDATE userinfo SET first_name = ?, last_name = ?, phone_number = ?, city = ?, province = ?, postal_code = ?, feedback_message = ? WHERE email = ?",
              [
                first_name,
                last_name,
                phone_number,
                city,
                province,
                postal_code,
                feedback_message,
                email,
              ]
            );
            console.log(
              "Message and contact info updated for existing contact" // Message and contact info both updated
            );
          } else {
            // If user doesnt want to update contact information
            con.query(
              "UPDATE userinfo SET feedback_message = ? WHERE email = ?",
              [feedback_message, email]
            );
            console.log("Message updated for existing contact"); // Just message updated
          }

          // Redirect to thank-you page with updated status
          res.redirect(
            `/thank-you?status=updated&fullname=${
              first_name + " " + last_name
            }&email=${email}`
          );
        } else {
          // If the user does not exist, insert new record
          const result = con.query(
            `INSERT INTO userinfo 
          (first_name, last_name, email, phone_number, city, province, postal_code, feedback_message) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              first_name,
              last_name,
              email,
              phone_number,
              city,
              province,
              postal_code,
              feedback_message,
            ]
          );

          console.log("Data inserted successfully:", result);
          // Redirect to thank-you page with added status
          res.redirect(
            `/thank-you?status=added&fullname=${
              first_name + " " + last_name
            }&email=${email}`
          );
        }
      }
    );
  } catch (error) {
    console.error("Error processing form:", error);
    res.status(500).send("An error occurred while submitting the form.");
  }
});

// Thank you page route
router.get("/thank-you", (req, res) => {
  let { status, fullname, email } = req.query;
  res.render("thankyou", {
    title: "Thankyou",
    currentPage: "thankyou",
    pageCss: "thankyou",
    status,
    fullname,
    email,
  });
});

// Fetch and display all messages
router.get("/messages", (req, res) => {
  // IMPPPP -- So that community page updates when back button is pressed --
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // Fetching messages from userinfo
  con.query(
    "SELECT user_id, first_name, last_name, email, feedback_message FROM userinfo",
    (error, result) => {
      if (error) throw error;
      res.render("messages", {
        title: "Messages",
        currentPage: "messages",
        pageCss: "messages",
        messages: result, // Pass messages to the view
      });
    }
  );
});

// Delete message by user ID
router.post("/messages/delete/:id", (req, res) => {
  const id = req.params.id;
  try {
    // Delete record by user ID
    con.query(
      "DELETE FROM userinfo WHERE user_id = ?",
      [id],
      (error, result) => {
        if (error) throw error;
        console.log("Message deleted", result);
        res.redirect(`/thank-you?status=deleted`);
      }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Server Error");
  }
});

// 404 route handler for undefined routes
router.use((req, res, next) => {
  res
    .status(404)
    .render("404", { title: "404", currentPage: "", pageCss: "404" });
});

export default router;
