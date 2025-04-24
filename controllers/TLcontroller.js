const TLModel = require("../models/TLmodels");

exports.searchUser = async (req, res) => {
    const olmid = req.params.olmid.trim();
    console.log(`Searching for OLM ID: ${olmid}`); // ✅ Debugging log
  
    try {
      const result = await TLModel.findUserByOlmId(olmid);
      console.log("DB Result:", result); // ✅ Debugging log
  
      if (result.length > 0) {
        res.json({ success: true, user: result[0] });
      } else {
        res.json({ success: false, message: "User not found" });
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  