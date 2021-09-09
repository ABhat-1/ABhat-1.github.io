let c = document.getElementById("Project-Canvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  forward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    block: [],
    forward: [],
  };
  let imagesToLoad = 0;

  ["idle", "kick", "punch", "backward", "block", "forward"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });

  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let Animations = [];

  let aux = () => {
    let selectedAnimation;

    if (Animations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = Animations.shift();
    }

    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick").onclick = () => {
    Animations.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    Animations.push("punch");
  };

  document.getElementById("block").onclick = () => {
    Animations.push("block");
  };

  document.getElementById("backward").onclick = () => {
    Animations.push("backward");
  };

  document.getElementById("forward").onclick = () => {
    Animations.push("forward");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
      Animations.push("kick");
    } else if (key === "ArrowRight") {
      Animations.push("punch");
    } else if (key === "ArrowUp") {
      Animations.push("forward");
    } else if (key === "ArrowDown") {
      Animations.push("backward");
    } else if (key === " ") {
      Animations.push("block");
    }
  });
});
