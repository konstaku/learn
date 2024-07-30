const fs = require('fs');
const mongoose = require('mongoose');

const MONGO_PASSWORD = 'lyHt7dp3eHzEv1GM';
const uri = `mongodb+srv://0864380:${MONGO_PASSWORD}@piglets.vfyjg2w.mongodb.net/`;
const COOKIE = 'oo=v1; ds_user_id=3413246; ig_did=5844A739-1C73-4E6D-9EAD-CEA2C5A5D71F; fbm_124024574287414=base_domain=.instagram.com; mid=ZGvYSwAEAAFKvw5BoQh0EXcYsHmK; datr=UBl_ZHSk8rm_tlPfdr3mRL3J; csrftoken=eHcPfP5DU1QxfOMPUXiWMbDWWCS1FL28; sessionid=3413246%3AVIBTzkIEHmHpH7%3A8%3AAYcOXza9I4q0Pi7kcX_7TFcDjxnppkSOLgU02LyZfUg; shbid="15738\0543413246\0541729684171:01f718598464d68fa2c64ab9c631be562119b3a4b8dcc49cdc998e23d2608a12e1b944d9"; shbts="1698148171\0543413246\0541729684171:01f706d7a9409ee2ce4a28c1c72f5db9e4ed73f6779b71dcf896a1d7db91094031b43495"; rur="NAO\0543413246\0541729711204:01f7c6c817abc5409c809ecfbd22448709055d12af3d60bf6f609fe80d5de2d34e5724b5"'

const masterTags = {
  "users": [
    {
      "id": "6536829cea9585bce8baa077",
      "tags": {
        "en": [
          "neurologist",
          "manual therapist",
          "physiotherapy"
        ],
        "ua": [
          "невролог",
          "мануальный терапевт",
          "фізіотерапія"  
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa07a",
      "tags": {
        "en": [
          "gynecologist"
        ],
        "ua": [
          "гинеколог"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa07e",
      "tags": {
        "en": [
          "massage therapist",
          "body massage"
        ],
        "ua": [
          "массажист",
          "тілесний масаж"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa083",
      "tags": {
        "en": [
          "manicurist",
          "nail extensions" 
        ],
        "ua": [
          "манікюр",
          "нарощування нігтів"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa086",
      "tags": {
        "en": [
          "massage therapist",
          "anticellulite massage"
        ],
        "ua": [
          "массажист",
          "антицелюлітний масаж"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa08d",
      "tags": {
        "en": [
          "brow correction",
          "brow lamination"
        ],
        "ua": [
          "корекція брів",
          "ламінування"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa091",
      "tags": {
        "en": [
          "beautician",
          "rejuvenation"
        ],
        "ua": [
          "косметолог",
          "омоложення"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa094",
      "tags": {
        "en": [
          "manicurist",
          "nail extensions"
        ],
        "ua": [
          "манікюр",
          "нарощування нігтів"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa09b",
      "tags": {
        "en": [
          "dentist"
        ],
        "ua": [
          "стоматолог"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa09e",
      "tags": {
        "en": [
          "lawyer"
        ],
        "ua": [
          "юрист"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa0a1",
      "tags": {
        "en": [
          "massage therapist",
          "rehabilitation"
        ],
        "ua": [
          "массажист",
          "реабілітація"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa0a4",
      "tags": {
        "en": [
          "photographer"
        ],
        "ua": [
          "фотограф"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa0a7",
      "tags": {
        "en": [
          "lip fillers"
        ],
        "ua": [
          "контурна пластика губ"
        ]
      }
    },
    {
      "id": "6536829cea9585bce8baa0aa",
      "tags": {
        "en": [
          "lip fillers"
        ],
        "ua": [
          "контурна пластика губ"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0ad",
      "tags": {
        "en": [
          "hairdresser", 
          "keratin"
        ],
        "ua": [
          "перукар",
          "кератин" 
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0b0",
      "tags": {
        "en": [
          "permanent makeup"
        ],
        "ua": [
          "перманентний макіяж"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0b4",
      "tags": {
        "en": [
          "translator"
        ],
        "ua": [
          "перекладач"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0b7",
      "tags": {
        "en": [
          "dentist"
        ],
        "ua": [
          "стоматолог"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0ba",
      "tags": {
        "en": [
          "makeup artist"
        ],
        "ua": [
          "візажист"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0be",
      "tags": {
        "en": [
          "tennis coach"
        ],
        "ua": [
          "тренер з тенісу"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0c4",
      "tags": {
        "en": [
          "dentist"
        ],
        "ua": [
          "стоматолог"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0ca",
      "tags": {
        "en": [
          "electrician"
        ],
        "ua": [
          "електрик"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0cd",
      "tags": {
        "en": [
          "massage therapist",
          "sports massage"
        ],
        "ua": [
          "массажист",
          "спортивний масаж"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0d0",
      "tags": {
        "en": [
          "manicurist" 
        ],
        "ua": [
          "манікюр"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0d3",
      "tags": {
        "en": [
          "orthodontist",
          "braces"
        ],
        "ua": [
          "ортодонт",
          "брекети"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0d8",
      "tags": {
        "en": [
          "pediatric dentist"
        ],
        "ua": [
          "дитячий стоматолог"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0db",
      "tags": {
        "en": [
          "massage therapist"
        ],
        "ua": [
          "массажист"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0de",
      "tags": {
        "en": [
          "auto mechanic"
        ],
        "ua": [
          "автомеханік"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0e3",
      "tags": {
        "en": [
          "auto mechanic",
          "car transportation"
        ],
        "ua": [
          "автомеханік",
          "перевезення авто"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0e7",
      "tags": {
        "en": [
          "tattoo artist",
          "permanent makeup"
        ],
        "ua": [
          "татуювальник",
          "перманентний макіяж"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0ec",
      "tags": {
        "en": [
          "manicure",
          "depilation"
        ],
        "ua": [
          "манікюр",
          "епіляція"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0f1",
      "tags": {
        "en": [
          "hairdresser",
          "hair restoration"
        ],
        "ua": [
          "перукар",
          "відновлення волосся"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0f6",
      "tags": {
        "en": [
          "hairdresser",
          "manicure"
        ],
        "ua": [
          "перукар",
          "манікюр"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0fb",
      "tags": {
        "en": [
          "beautician",
          "laser hair removal"
        ],
        "ua": [
          "косметолог",
          "лазерна епіляція"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa0ff",
      "tags": {
        "en": [
          "depilation",
          "manicure"
        ],
        "ua": [
          "епіляція",
          "манікюр"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa103",
      "tags": {
        "en": [
          "beautician",
          "biorevitalization"
        ],
        "ua": [
          "косметолог",
          "біоревіталізація"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa107",
      "tags": {
        "en": [
          "dermatologist",
          "lip fillers"
        ],
        "ua": [
          "дерматолог",
          "контурна пластика губ"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa10c",
      "tags": {
        "en": [
          "obstetrician"
        ],
        "ua": [
          "гінеколог"
        ]
      }
    },
    {
      "id": "6536829dea9585bce8baa110",
      "tags": {
        "en": [
          "electrician"
        ],
        "ua": [
          "електрик"
        ] 
      }
    }
  ]
}

const masterSchema = new mongoose.Schema({
  name: String,
  professionID: String,
  countryID: String,
  locationID: String,
  contacts: [
    {
      contactType: String,
      value: String,
    },
  ],
  about: String,
  photo: String,
  likes: { type: Number, default: 0 },
  tags: {
    ua: [String],
    en: [String],
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Master = mongoose.model('Master', masterSchema);

async function main() {

  await mongoose.connect(uri);
  console.log('Database connected');

  // await fetchAndSaveInstagramPhotos();
  // await updateMasterTags();
  await approveAllMasters();

  // for (const myMaster of masterTags.users) {
  //   console.log(myMaster.id);
  // }

  return;

  async function approveAllMasters() {
    const masters = await Master.find();

    for await (const master of masters) {
      console.log('id:', master._id);

      Master.findByIdAndUpdate(master.id, {
            approved: true,
          })
            .then(() =>
              console.log(`User ${master._id} approved`)
            )
            .catch(console.error);
    }
  }

  // async function updateMasterTags() {
  //   const masters = await Master.find();

  //   for await (const master of masters) {
  //     console.log('id:', master._id);
  //     const myMasters = masterTags.users;
  //     const currentMaster = myMasters.find((m) => master._id.toString().includes(m.id));
  //     console.log('currentMaster:', currentMaster);

  //     Master.findByIdAndUpdate(currentMaster.id, {
  //           tags: currentMaster.tags,
  //         })
  //           .then(() =>
  //             console.log(`User ${master._id} database entry updated successfully`)
  //           )
  //           .catch(console.error);
  //   }
  // }

  // async function fetchAndSaveInstagramPhotos() {
  //   const masters = await Master.find();

  //   for await (const master of masters) {
  //     const instaContact = master.contacts.filter(
  //       (contact) => contact.contactType === 'instagram'
  //     );

  //     console.log('instaContact:', instaContact);

  //     if (instaContact.length) {
  //       const handle = instaContact[0].value;
  //       const id = master._id;

  //       console.log(`fetching photo for user ${handle}`);

  //       const photoUrl = await fetch(
  //         `https://www.instagram.com/${handle}/?__a=1&__d=1`,
  //         { method: 'GET', headers: { Cookie: COOKIE } }
  //       )
  //         .then(response => response.json())
  //         .then((result) => result.graphql.user.profile_pic_url)
  //         .catch(console.error);

  //       const photo = await fetch(photoUrl)
  //         .then((response) => response.blob())
  //         .then((blob) => blob.arrayBuffer())
  //         .then(Buffer.from)
  //         .catch(console.error);

  //       fs.writeFileSync(`./photos/${id}.jpg`, photo);
  //       console.log(`Photo for user ${id} written successfully`);
  //     }
  //   }
  // }
}

main().catch(console.error);
