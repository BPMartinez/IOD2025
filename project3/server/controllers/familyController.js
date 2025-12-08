
const User = require("../models/User");


const getSchoolNetwork = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const families = await User.find(
      { schoolCode: user.schoolCode },
      { passwordHash: 0, __v: 0 } 
    );

    res.json(families);
  } catch (err) {
    console.error("getSchoolNetwork error:", err);
    res.status(500).json({ message: "Error loading network" });
  }
};


const createChildProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { name, grade, photoUrl } = req.body;

    if (!name || !grade) {
      return res.status(400).json({ message: "Name and grade are required" });
    }


    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      return res.status(404).json({ message: "Family not found" });
    }

    const newChild = {
      name: name.trim(),
      grade: grade.trim(),
      photoUrl: (photoUrl || "").trim(),
    };

    dbUser.children.push(newChild);
    await dbUser.save();

    // Return just the newly created child (last in array)
    const createdChild = dbUser.children[dbUser.children.length - 1];

    res.json(createdChild);
  } catch (err) {
    console.error("createChildProfile error:", err);
    res.status(500).json({ message: "Error saving child profile" });
  }
};


const updateChildProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { childId } = req.params;
    const { name, grade, photoUrl } = req.body;

    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      return res.status(404).json({ message: "Family not found" });
    }

    
    const child = dbUser.children.id(childId);
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    if (name !== undefined) child.name = name.trim();
    if (grade !== undefined) child.grade = grade.trim();
    if (photoUrl !== undefined) child.photoUrl = photoUrl.trim();

    await dbUser.save();

    res.json({
      message: "Child updated successfully",
      child,
    });
  } catch (err) {
    console.error("updateChildProfile error:", err);
    res.status(500).json({ message: "Error updating child profile" });
  }
};


const deleteChildProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { childId } = req.params;

    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      return res.status(404).json({ message: "Family not found" });
    }

    const child = dbUser.children.id(childId);
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    child.deleteOne();
    await dbUser.save();

    res.json({ message: "Child deleted successfully" });
  } catch (err) {
    console.error("deleteChildProfile error:", err);
    res.status(500).json({ message: "Error deleting child profile" });
  }
};

module.exports = {
  getSchoolNetwork,
  createChildProfile,
  updateChildProfile,
  deleteChildProfile,
};
