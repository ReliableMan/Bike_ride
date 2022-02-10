const cl = new cloudinary.Cloudinary({cloud_name: "dbqwl7aww", secure: true});

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {
    console.log(result); 
  });
