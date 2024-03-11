# Readme

This project allows for simple in-browser editing of templates. Templates can be created by exporting layers of an existing (photoshop) template layer by layer and configuring them in javascript, setting their blending options, ordering, etc. Though configuring a new template should not be too difficult, having a way for laymen to create a new template is beyond the scope of this project, as templated generally rarely need to be changed, and this cuts down on maintanance load compared to negletable gain. Look at any of the existing templates and the configuration options of the classes for inspiration.

The project consists of 4 core classes, and one shared javascript file. The shared JS file takes care of the majority of configuration and automagic name resolving. Below is a short summary of all 4 core classes.

# Possible future developments

* Extract several features, such as draggability, resizability, into the abstract layer, or unify the 2 image classes into a single configurable image class.
* More checks and documentation, general cleanup, of the text class, as this is by far the most complex class.
* Giving classes a more sensible name

# Abstract Layer

The abstractLayer class serves as an abstract base class for various graphical layers. It provides basic functionality for position management, dragging, locking positions, and shadow effects. This class should be extended by specific layer types.

## Properties

    xIsLocked: Indicates whether the X position is locked.
    yIsLocked: Indicates whether the Y position is locked.
    isDraggable: Indicates whether the layer is draggable.
    isDragging: Indicates whether the layer is currently being dragged.
    dragStart: An object representing the starting position of a drag operation.
    shadowColor: The color of the shadow effect.
    shadowBlur: The blur radius of the shadow effect.
    shadowOffsetX: The horizontal offset of the shadow effect.
    shadowOffsetY: The vertical offset of the shadow effect.

## Methods

    getPosition(): (Abstract) Returns the actual internal position {x, y} of the layer.
    getVisibleDimentions(): (Abstract) Returns the visible area {x, y, width, height} of the layer.
    setPositionInternal(x, y): (Abstract) Sets the actual internal position of the layer.
    internalDraw(context): (Abstract) Draws the element on the provided 2D context.
    draw(context): Sets shadow properties and delegates drawing to internalDraw.
    setPosition(x, y): Sets the position, respecting locked positions.
    makeDraggable(canvas): Enables the layer to be draggable within the specified canvas.
    lockYPosition(): Locks the Y position of the element.
    lockXPosition(): Locks the X position of the element.
    startDrag(x, y): Initiates a drag operation if the layer is draggable and selected.
    stopDrag(): Stops the current drag operation.
    drag(x, y): Drags the layer if a drag operation is ongoing.
    setShadow(color, blur, xOffset, yOffset): Sets the shadow properties.

# Image Wrapper (ImgWrapper)

The ImgWrapper class extends abstractLayer to represent a simple image layer with blending modes. This layer can not be rescaled, but can be repositioned.

## Properties

    blendingmode: The blending mode for the image.
    position: The position of the image.
    img: An HTML Image element.

## Methods

    getPosition(): Returns the position {x, y} of the image.
    getVisibleSize(): Returns the visible area {x, y, width, height} of the image.
    setPositionInternal(x, y): Sets the actual internal position of the image.
    internalDraw(context): Draws the image with the specified blending mode.

# Draggable Resizable Object

The DraggableResizableObject class extends abstractLayer to represent an object that can be dragged, resized, and controlled by a slider.

## Properties

    position: The position of the object.
    size: The size of the object.
    img: The image associated with the object.
    sliderInput: The HTML slider input element to use for resizing the layer.
    canvas: The canvas where the object is drawn.

## Methods

    getPosition(): Returns the position {x, y} of the object.
    getVisibleDimentions(): Returns the visible area {x, y, width, height} of the object.
    setPositionInternal(x, y): Sets the actual internal position of the object.
    internalDraw(context): Draws the object with the applied scaling factor.
    setScale(factor): Sets the scaling factor for the object.

# Text Drawable

The TextDrawable class extends abstractLayer to represent a drawable text layer.

## Properties

    Various properties related to text rendering, including font, line spacing, color, position, size, and dynamic sizing options.
    Several options are mutually exclusive or interdependent. For example, a width and height must be set if a dynamic font size is used.

## Methods

    getPosition(): Returns the position {x, y} of the text.
    getVisibleDimentions(): Returns the visible area {x, y, width, height} of the text.
    setPositionInternal(x, y): Sets the actual internal position of the text.
    internalDraw(context): Draws the text with the specified styling.
    setFont(size): Sets the font for the text.
    calculateFontSize(): Dynamically calculates the font size based on available space.
    setText(text): Sets the text content.