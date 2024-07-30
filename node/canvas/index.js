const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

// Color palette for my cards
const colorPalette = [
  '#F94C66', // coral
  '#F37D5D', // pumpkin
  '#FBB13C', // yellow
  '#FCD34D', // dandelion
  '#BCE784', // green
  '#63B2AF', // teal
  '#5E9FE0', // sky
  '#DF73FF', // magenta
  '#B671F6', // purple
  '#F49AC1', // pink
  '#EF5B5B', // red
  '#FF842D', // orange
  '#E9777D', // rose
  '#FFCF48', // sunflower
  '#F3AB47', // gold
  '#A0E4CB', // turquoise
  '#9DF1DF', // mint
  '#D599FF', // lilac
  '#B5B2FF', // periwinkle
];

const master = {
    id: '6536829dea9585bce8baa0d3',
    name: 'Константін',
    profession: 'Software creator',
    location: 'Turin',
    contacts: [
            {type: 'phone', value: '+380636262326'},
            {type: 'instagram', value: 'skvol'},
            {type: 'telegram', value: 'wondercooler'},
        ],
    
}

// Dimensions and margins
const width = 1200;
const height = 627;
const margin = 24;
const cornerRadius = 40;

// Font styles
const fontName = 'Unbounded';
const textMarginLeft = margin + 36;
// h1
const h1Size = 72;
const h1Weight = 600;
const h1MarginTop = 72 + h1Size;
// h2
const h2Size = 48;
const h2Weight = 400;
const h2MarginTop = h1MarginTop + margin + h2Size;
// contacts
const contactsSize = 32;
const contactsWeight = 400;
const contactsMarginTop = height - margin - 36 - master.contacts.length * contactsSize;
const contactsValuesMarginLeft = 240 + textMarginLeft;

// Logo style
const logoPosition = {
    w: 239,
    h: 34,
    x: 900,
    y: height - margin - 36 - 44,
};

// Create canvas
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

// Background fill
context.fillStyle = "#ffffff";
context.fillRect(0, 0, width, height);

// Card fill
context.fillStyle = getColorFromId(master.id);
roundedRect(context, margin, margin, width - margin * 2, height - margin * 2, cornerRadius);

// Put a name on a picture
context.font = `${h1Weight} ${h1Size}px ${fontName}`;
context.fillStyle = "#000000"
const name = master.name;
context.fillText(name, textMarginLeft, h1MarginTop);

// Put a profession on a picture
context.font = `${h2Weight} ${h2Size}px ${fontName}`;
const profession = master.profession;
context.fillText(profession, textMarginLeft, h2MarginTop);

// Put contacts names on a picture
context.font = `${contactsWeight} ${contactsSize}px ${fontName}`;
const contactsNames = master.contacts.map((contact) => contact.type + ':').join('\n');
context.fillText(contactsNames, textMarginLeft, contactsMarginTop);

// Put contacts values on a picture
const contactsValues = master.contacts.map((contact) => contact.value).join('\n');
context.fillText(contactsValues, contactsValuesMarginLeft, contactsMarginTop);

// Render logo and save image
loadImage('./img/logo.png')
    .then((image) => {
        const { w, h, x, y } = logoPosition;
        context.drawImage(image, x, y, w, h);

        // Save image
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('./skvol.png', buffer);
    });

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
}

function getColorFromId(id) {
    if (!id) return '#ffffff';
    const seed = parseInt(id.slice(-2), 16) % colorPalette.length;
    return colorPalette[seed] + '35';
}
