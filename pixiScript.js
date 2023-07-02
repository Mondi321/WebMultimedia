const app = new PIXI.Application({
    antialias: true,
    background: "#ffffff",
  });

  const detailsPhoto = document.querySelector(".detailsPhoto");

  detailsPhoto.appendChild(app.view);

  const stageHeight = app.screen.height;
  const stageWidth = app.screen.width;

  // Make sure stage covers the whole scene
  app.stage.hitArea = app.screen;

  // Make the slider
  const sliderWidth = 320;
  const slider = new PIXI.Graphics()
    .beginFill(0x272d37)
    .drawRect(0, 0, sliderWidth, 4);

  slider.x = (stageWidth - sliderWidth) / 2;
  slider.y = stageHeight * 0.75;

  // Draw the handle
  const handle = new PIXI.Graphics().beginFill(0xf2f2f2).drawCircle(0, 0, 8);

  handle.y = slider.height / 2;
  handle.x = sliderWidth / 2;
  handle.interactive = true;
  handle.cursor = "pointer";

  handle
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd);

  app.stage.addChild(slider);
  slider.addChild(handle);

  // Add bunny whose scale can be changed by user using slider
  const bunny = app.stage.addChild(
    PIXI.Sprite.from("https://i.ibb.co/37Y74kv/showcase.jpg")
  );

  bunny.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  bunny.scale.set(0.3);
  bunny.anchor.set(0.5);
  bunny.x = stageWidth / 2;
  bunny.y = stageHeight / 2;

  // Add title
  const title = new PIXI.Text(
    "Drag the handle to change the scale of headphones.",
    {
      fill: "#272d37",
      fontFamily: "Catamaran",
      fontSize: 20,
      align: "center",
    }
  );

  title.roundPixels = true;
  title.x = stageWidth / 2;
  title.y = 40;
  title.anchor.set(0.5, 0);
  app.stage.addChild(title);

  // Listen to pointermove on stage once handle is pressed.
  function onDragStart() {
    app.stage.interactive = true;
    app.stage.addEventListener("pointermove", onDrag);
  }

  // Stop dragging feedback once the handle is released.
  function onDragEnd(e) {
    app.stage.interactive = false;
    app.stage.removeEventListener("pointermove", onDrag);
  }

  // Update the handle's position & bunny's scale when the handle is moved.
  function onDrag(e) {
    const halfHandleWidth = handle.width / 2;
    // Set handle y-position to match pointer, clamped to (4, screen.height - 4).

    handle.x = Math.max(
      halfHandleWidth,
      Math.min(slider.toLocal(e.global).x, sliderWidth - halfHandleWidth)
    );
    // Normalize handle position between -1 and 1.
    const t = 2 * (handle.x / sliderWidth - 0.5);

    bunny.scale.set(0.2 * (1.1 + t));
  }





// App 2



const detailsInfoHeadphones = document.querySelector('.detailsInfoHeadphones');

const appTwo = new PIXI.Application({ background: '#ffffff', resizeTo: detailsInfoHeadphones });

detailsInfoHeadphones.appendChild(appTwo.view);

// create a texture from an image path
const texture = PIXI.Texture.from("./assets/colorfulHeadphones.png");

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

for (let i = 0; i < 6; i++)
{
    createBunny(
        Math.floor(Math.random() * appTwo.screen.width),
        Math.floor(Math.random() * appTwo.screen.height),
    );
}

function createBunny(x, y)
{
    // create our little bunny friend..
    const bunny = new PIXI.Sprite(texture);

    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    bunny.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    bunny.cursor = 'pointer';

    // center the bunny's anchor point
    bunny.anchor.set(0.5);

    // make it a bit bigger, so it's easier to grab
    bunny.scale.set(0.1);

    // setup events for mouse + touch using
    // the pointer events
    bunny.on('pointerdown', onDragStart, bunny);

    // move the sprite to its designated position
    bunny.x = x;
    bunny.y = y;

    // add it to the stage
    appTwo.stage.addChild(bunny);
}

let dragTarget = null;

appTwo.stage.interactive = true;
appTwo.stage.hitArea = appTwo.screen;
appTwo.stage.on('pointerup', onDragEnd);
appTwo.stage.on('pointerupoutside', onDragEnd);

function onDragMove(event)
{
    if (dragTarget)
    {
        dragTarget.parent.toLocal(event.global, null, dragTarget.position);
    }
}

function onDragStart()
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    // this.data = event.data;
    this.alpha = 0.5;
    dragTarget = this;
    appTwo.stage.on('pointermove', onDragMove);
}

function onDragEnd()
{
    if (dragTarget)
    {
        appTwo.stage.off('pointermove', onDragMove);
        dragTarget.alpha = 1;
        dragTarget = null;
    }
}