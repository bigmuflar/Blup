var createTemplate = require("passbook"),
    template = createTemplate("coupon", {
      passTypeIdentifier: "pass.com.example.passbook",
      teamIdentifier:     "MXL",
      backgroundColor:   "rgb(255,255,255)"
    });

    template.keys("/etc/passbook/keys", "secret");
    template.loadImagesFrom("images");

    template.fields.passTypeIdentifier = "pass.com.beacons.blup";

    console.log(template.passTypeIdentifier());

    template.teamIdentifier("MXL").passTypeIdentifier("pass.com.beacons.blup")
