/**
 * Adds the general palette to the sidebar.
 */
const addClassDiagramPalette = function (sb, expand) {
  // Reusable cells
  var field = new mxCell(
    "+ field: type",
    new mxGeometry(0, 0, 100, 26),
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;"
  );
  var attributeField = new mxCell(
    "+ field: type",
    new mxGeometry(0, 0, 100, 26),
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=attribute"
  );
  var methodField = new mxCell(
    "+ method(type): type",
    new mxGeometry(0, 0, 100, 26),
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method"
  );
  var _controller = new mxCell(
    "Controller",
    new mxGeometry(0, 0, 100, 26),
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;componentName=method"
  );

  field.vertex = true;
  attributeField.vertex = true;
  methodField.vertex = true;
  _controller.vertex = true;

  var divider = new mxCell(
    "",
    new mxGeometry(0, 0, 40, 8),
    "line;html=1;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;"
  );
  divider.vertex = true;

  // Default tags
  var dt = "uml static class ";

  var fns = [
    /* Object */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Object",
        new mxGeometry(0, 0, 90, 40),
        "html=1;whiteSpace=wrap;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Object"
      );
    }),

    /* Item Atribute */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "+ item atribute",
        new mxGeometry(0, 0, 100, 30),
        "text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Item 1"
      );
    }),
    /* sb.addEntry(dt + 'item member method function variable field attribute label', function () {
      return sb.createVertexTemplateFromCells([sb.cloneCell(field, '+ item: attribute')], field.geometry.width, field.geometry.height, 'Item 1');
    }), */

    /* Divider */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 90, 10),
        "line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=inherit;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Divider"
      );
    }),

    /* Title */
    sb.createVertexTemplateEntry(
      "text;html=1;align=center;fontStyle=1;verticalAlign=middle;spacingLeft=3;spacingRight=3;strokeColor=none;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;",
      80,
      26,
      "Title",
      "Title",
      null,
      null,
      dt + "title label"
    ),

    /* Boundary Object */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Boundary Object",
        new mxGeometry(0, 0, 100, 80),
        "shape=umlBoundary;whiteSpace=wrap;html=1;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Boundary Object"
      );
    }),

    /* Entity Object */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Entity Object",
        new mxGeometry(0, 0, 90, 90),
        "ellipse;shape=umlEntity;whiteSpace=wrap;html=1;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Entity Object"
      );
    }),

    /* Control Object */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Control Object",
        new mxGeometry(0, 0, 90, 90),
        "ellipse;shape=umlControl;whiteSpace=wrap;html=1;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Control Object"
      );
    }),

    /* Actor */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Actor",
        new mxGeometry(0, 0, 45, 80),
        "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;strokeColor=#001933;fillColor=#ffffff;gradientColor=#FFB366;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Actor"
      );
    }),

    /* Object */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        ":Object",
        new mxGeometry(0, 0, 100, 300),
        'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Object"
      );
    }),

    /* Actor Lifeline */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 30, 300),
        'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlActor;'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Actor Lifeline"
      );
    }),

    /* Boundary Lifeline */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 50, 300),
        'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlBoundary;'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Boundary Lifeline"
      );
    }),

    /* Entity */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 50, 300),
        'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlEntity;'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Entity Lifeline"
      );
    }),


    /* Control Lifeline */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 50, 300),
        'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;newEdgeStyle={"curved":0,"rounded":0};participant=umlControl;'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Control Lifeline"
      );
    }),

    /* Frame */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "frame",
        new mxGeometry(0, 0, 500, 300),
        'shape=umlFrame;whiteSpace=wrap;html=1;pointerEvents=0;'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Frame"
      );
    }),

    /* Destructio */
    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 30, 30),
        'shape=umlDestroy;whiteSpace=wrap;html=1;strokeWidth=3;targetShapes=umlLifeline;'
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Frame"
      );
    }),

    /* sb.addEntry('UML Actor', function() {
      var cell = new mxCell('Actor', new mxGeometry(0, 0, 30, 60),
        'shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;');
      cell.vertex = true;
      var style = new Object();
      style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
      style[mxConstants.STYLE_STROKECOLOR] = '#000000';
      style[mxConstants.STYLE_FONTCOLOR] = '#000000';
      var styleString = mxUtils.setStyle(null, style);
      cell.setStyle(styleString);
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Actor');
    }), */

    /* sb.addEntry('UML Use Case', function() {
      var cell = new mxCell('Use Case', new mxGeometry(0, 0, 120, 80),
        'ellipse;whiteSpace=wrap;html=1;');
      cell.vertex = true;
      var style = new Object();
      style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
      style[mxConstants.STYLE_ALIGN] = 'center';
      style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
      style[mxConstants.STYLE_STROKECOLOR] = '#000000';
      style[mxConstants.STYLE_FONTCOLOR] = '#000000';
      var styleString = mxUtils.setStyle(null, style);
      cell.setStyle(styleString);
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Use Case');
    }), */

    /* sb.addEntry('UML Sequence Participant', function() {
      var cell = new mxCell('Participant', new mxGeometry(0, 0, 120, 40),
        'rounded=0;whiteSpace=wrap;html=1;');
      cell.vertex = true;
      var style = new Object();
      style[mxConstants.STYLE_SHAPE] = 'umlActor';
      style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
      style[mxConstants.STYLE_ALIGN] = 'center';
      style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
      style[mxConstants.STYLE_STROKECOLOR] = '#000000';
      style[mxConstants.STYLE_FONTCOLOR] = '#000000';
      var styleString = mxUtils.setStyle(null, style);
      cell.setStyle(styleString);
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Participant');
    }), */

    /* sb.addEntry('UML Sequence Message', function() {
      var cell = new mxCell('Message', new mxGeometry(0, 0, 100, 40),
        'rounded=0;whiteSpace=wrap;html=1;');
      cell.vertex = true;
      var style = new Object();
      style[mxConstants.STYLE_SHAPE] = 'umlMessage';
      style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
      style[mxConstants.STYLE_ALIGN] = 'center';
      style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
      style[mxConstants.STYLE_STROKECOLOR] = '#000000';
      style[mxConstants.STYLE_FONTCOLOR] = '#000000';
      var styleString = mxUtils.setStyle(null, style);
      cell.setStyle(styleString);
      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Message');
    }), */

    sb.addEntry("UML Sequence Activation", function () {
      var cell = new mxCell(
        "",
        new mxGeometry(0, 0, 10, 50),
        "shape=umlActivation;whiteSpace=wrap;html=1;"
      );
      cell.vertex = true;
      var style = new Object();
      style[mxConstants.STYLE_VERTICAL_ALIGN] = "middle";
      style[mxConstants.STYLE_ALIGN] = "center";
      style[mxConstants.STYLE_FILLCOLOR] = "#ffffff";
      style[mxConstants.STYLE_STROKECOLOR] = "#000000";
      style[mxConstants.STYLE_FONTCOLOR] = "#000000";
      var styleString = mxUtils.setStyle(null, style);
      cell.setStyle(styleString);
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Activation Bar"
      );
    }),
    /* Fount Message 1 */
    sb.createEdgeTemplateEntry(
      "html=1;verticalAlign=bottom;startArrow=oval;startFill=1;endArrow=block;startSize=8;curved=0;rounded=0;",
      160,
      0,
      "dispatch",
      "Fount Message 1",
      null,
      "uml generalization extend"
    ),

    /* Fount Message 2 */
    sb.createEdgeTemplateEntry(
      "html=1;verticalAlign=bottom;startArrow=circle;startFill=1;endArrow=open;startSize=6;endSize=8;curved=0;rounded=0;",
      160,
      0,
      "dispatch",
      "Fount Message 2",
      null,
      "uml generalization extend"
    ),

    /* Return */
    sb.createEdgeTemplateEntry(
      "html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;curved=0;rounded=0;",
      160,
      0,
      "return",
      "Return",
      null,
      "uml generalization extend"
    ),

    sb.createEdgeTemplateEntry(
      "html=1;verticalAlign=bottom;endArrow=block;curved=0;rounded=0;",
      160,
      0,
      "dispatch",
      "Message",
      null,
      "uml generalization extend"
    ),

    /* sb.addEntry(dt + 'object instance', function () {
      var cell = new mxCell(
        'Internet Branking System', new mxGeometry(0, 0, 160, 90),
        'rounded=0;whiteSpace=wrap;html=1;shadow=0;dashed=1;sketch=0;strokeColor=#000000;strokeWidth=1;fillColor=none;'
      );
      cell.vertex = true;

      return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Internet Branking System');
    }), */

    /* sb.addEntry(dt + "divider hline line separator", function () {
      return sb.createVertexTemplateFromCells(
        [divider.clone()],
        divider.geometry.width,
        divider.geometry.height,
        "Divider"
      );
    }), */

    /* sb.createEdgeTemplateEntry(
      "edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0.5;entryY=0;dashed=1;jettySize=auto;orthogonalLoop=1;",
      160,
      0,
      "Description",
      "Relationship",
      null,
      "uml generalization extend"
    ), */

    /* sb.createEdgeTemplateEntry(
      "endArrow=block;dashed=1;endFill=0;endSize=12;html=1;rounded=0;",
      160,
      0,
      "Use",
      "Dependency",
      null,
      "uml generalization extend"
    ), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Container",
        new mxGeometry(0, 0, 160, 90),
        "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;"
      );
      cell.vertex = true;
      cell.insert(attributeField.clone());
      cell.insert(methodField.clone());
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Container"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Software System\nExisting System",
        new mxGeometry(0, 0, 160, 90),
        "html=1;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#999999;fontColor=#FFFFFF;fontFamily=Helvetica;componentName=class;strokeWidth=2;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Software System, Existing System"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        'Notifications\n[Software System]\n\n""',
        new mxGeometry(0, 0, 160, 90),
        "html=1;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#999999;fontColor=#FFFFFF;fontFamily=Helvetica;componentName=class;strokeWidth=2;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Notifications"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Database\n[Container: MySql]",
        new mxGeometry(0, 0, 160, 90),
        "shape=cylinder;whiteSpace=wrap;html=1;fontStyle=1;fontFamily=Helvetica;fontSize=14;fillColor=#438dd4;strokeColor=#000000;strokeWidth=2;fontColor=#FFFFFF;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Database"
      );
    }),

    sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        '\n\nCustomer\n\n[Person]\n""',
        new mxGeometry(0, 0, 160, 90),
        "shape=orEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Actor"
      );
    }), */

    

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "<< Annotation >>\nComponent",
        new mxGeometry(0, 0, 160, 90),
        "html=1;dropTarget=0;strokeColor=#001933;fillColor=#ffffff;gradientColor=#FFB366;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Component"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Block",
        new mxGeometry(0, 0, 160, 90),
        "verticalAlign=top;align=left;spacingTop=8;spacingLeft=2;spacingRight=12;shape=cube;size=10;direction=south;fontStyle=4;html=1;strokeColor=#001933;gradientColor=#FFB366;gradientDirection=north;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Block"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Controller\n[Component: Node.js]",
        new mxGeometry(0, 0, 160, 90),
        "html=1;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#85C1E9;fontColor=#000000;fontFamily=Helvetica;componentName=class;strokeWidth=2;"
      );
      cell.vertex = true;
      //cell.insert(_controller);
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Controller"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "ClassName",
        new mxGeometry(0, 0, 160, 90),
        "swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;"
      );
      cell.vertex = true;
      cell.insert(attributeField.clone());
      cell.insert(divider.clone());
      cell.insert(methodField.clone());
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "ClassName"
      );
    }), */

    /* sb.addEntry(dt + "object instance", function () {
      var cell = new mxCell(
        "Container",
        new mxGeometry(0, 0, 160, 90),
        "swimlane;"
      );
      cell.vertex = true;
      return sb.createVertexTemplateFromCells(
        [cell],
        cell.geometry.width,
        cell.geometry.height,
        "Container"
      );
    }), */
  ];

  sb.addPaletteFunctions(
    "classDiagram",
    mxResources.get("classDiagram"),
    expand || false,
    fns
  );
};

module.exports = addClassDiagramPalette;
