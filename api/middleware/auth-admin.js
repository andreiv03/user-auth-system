import Users from "../../models/users-model.js";

export default async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });

    const admins = [
      "andrei.voicu110@gmail.com"
    ];

    if (!admins.includes(user.email))
      return res.status(400).json({ message: "You do not have administrator privileges!" });

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}