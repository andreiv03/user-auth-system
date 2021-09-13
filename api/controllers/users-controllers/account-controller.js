import Users from "../../../models/users-model.js";

export default {
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ message: "This user does not exist!" });
      
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}