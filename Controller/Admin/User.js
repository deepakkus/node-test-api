var mongoose = require("mongoose");
const User = require("../../Models/user");
const {
    Validator
} = require("node-input-validator");
var uuidv1 = require("uuid").v1;
function createToken(data) {
    data.hase = uuidv1();
    return jwt.sign(data, "DonateSmile");
}
const create = async (req, res) => {
    const v = new Validator(req.body, {
        name: "required",
		email:"required",
        phone:"required",
        gender:"required"
    });
    let matched = await v.check().then((val) => val);
    if (!matched) {
        return res.status(200).send({
            status: false,
            error: v.errors
        });
    }
    let userData = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
		email: req.body.email,
        phone: req.body.phone,
		gender: req.body.gender,
        about: req.body.about,
        city: req.body.city,
        state: req.body.state,
    };
    const user = await new User(userData);
    return user
        .save()
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "New User Created successfully",
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                message: "Server error. Please try again.",
                error: error,
            });
        });
};
const update = async (req, res) => {

    return User.findOneAndUpdate(
      { _id: { $in: [mongoose.Types.ObjectId(req.params.id)] } },
      req.body,
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server error. Please try again.",
            error: err,
          });
        } else if (data != null) {
          data = { ...data._doc, ...req.body };
          return res.status(200).json({
            status: true,
            message: "User Content update successful",
            data: data,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "User Content not match",
            data: null,
          });
        }
      }
    );
  };
  const Delete = async (req, res) => {
    return User.findOneAndUpdate(
      { _id: { $in: [mongoose.Types.ObjectId(req.params.id)] } },
      {
        isDelete: true
      },
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server error. Please try again.",
            error: err,
          });
        } else if (data != null) {
          return res.status(200).json({
            status: true,
            message: "User Content Delete successfully",
            data: data,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "User does not match",
            data: null,
          });
        }
      }
    );
  }

  const viewSingel = async (req, res) => {
    return User.aggregate([{
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            
            {
                $project: {
                    "token": 0,
                    __v: 0,
                },
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        .then((data) => {
            if (data && data.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "Get Single User Successfully",
                    data: data[0],
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: "No User Found",
                    data: null,
                });
            }

        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                message: "Server error. Please try again.",
                error: error,
            });
        });
};
const viewAll = async (req, res) => {
    return User.aggregate([{
                $match: {
                    isDelete: false
                }
            },
            {
                $project: {
                  token: 0,
                  __v: 0,
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        .then((data) => {
            return res.status(200).json({
                status: true,
                message: "Get All User content  Successfully",
                data: data,
            });
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                message: "Server error. Please try again.",
                error: error,
            });
        });
};

module.exports = {
  create,
	update,
	Delete,
	viewSingel,
	viewAll
};