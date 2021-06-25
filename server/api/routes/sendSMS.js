const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const performance = require('perf_hooks').performance;

const router = express.Router();

const sendSMS = require("../models/sendsms");

const mSpaceapi = 'https://api.mspace.lk/sms/send';

router.post('/', (req, res, next) => {
    console.log("Send SMS");
    const time = new Date(Date.now());

    axios.post(mSpaceapi, {
        "version": "1.0",
        "applicationId": req.body.appId,
        "password": req.body.password,
        "message": req.body.message,
        "destinationAddresses": req.body.numbers,
        "sourceAddress": req.body.alias,
        "encoding": "8",
        "deliveryStatusRequest": "0"
    }, {
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    })
        .then(response => {
            const sendsms = new sendSMS({
                _id: new mongoose.Types.ObjectId(),
                createdAT: time.toLocaleString('en-GB', { timeZone: 'GMT' }) + ' GMT+00:00',
                appStatus: "mSupport",
                alias: req.body.alias,
                requestId: response.data.requestId,
                sendSMS: req.body.message,
                statusCode: response.data.statusCode,
                statusDetail: response.data.statusDetail,
                userResponses: response.data.destinationResponses
            });
            sendsms
                .save()
                .then(result => {
                    res.status(200).json({
                        status: "SMS Send Successfully",
                        created: result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                })
        })
        .catch(error => {
            console.log(error);
        });

});

router.post('/bulk', (req, res, next) => {
    console.log("Bulk sending to SP Base Started...!");
    //Test Details
    const test = [
        {
            "name": "sp1-test",
            "spID": "1-test",
            "spmobileNumber": "94719616446",
            "spEmail": "tissera.malithi@gmail.com",
            "messages": "Hi,We have sent you an important email to tissera.malithi@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp2-test",
            "spID": "2-test",
            "spmobileNumber": "94703841705",
            "spEmail": "dilummanjula72@gmail.com",
            "messages": "Hi,We have sent you an important email to dilummanjula72@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp3-test",
            "spID": "3-test",
            "spmobileNumber": "94717216815",
            "spEmail": "abewikramaarach@gmail.com",
            "messages": "Hi,We have sent you an important email to abewikramaarach@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp4-test",
            "spID": "4-test",
            "spmobileNumber": "94704301465",
            "spEmail": "sandun.idemart@gmail.com",
            "messages": "Hi,We have sent you an important email to sandun.idemart@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        }
    ]
    //Actual Details
    const spdetails = [
        {
            "name": "sp1",
            "spID": "1",
            "spmobileNumber": "94702422450",
            "spEmail": "tissera.malithi@gmail.com",
            "messages": "Hi,We have sent you an important email to tissera.malithi@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp2",
            "spID": "2",
            "spmobileNumber": "94702520785",
            "spEmail": "dilummanjula72@gmail.com",
            "messages": "Hi,We have sent you an important email to dilummanjula72@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp3",
            "spID": "3",
            "spmobileNumber": "94703583040",
            "spEmail": "abewikramaarach@gmail.com",
            "messages": "Hi,We have sent you an important email to abewikramaarach@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp4",
            "spID": "4",
            "spmobileNumber": "94703811920",
            "spEmail": "sandun.idemart@gmail.com",
            "messages": "Hi,We have sent you an important email to sandun.idemart@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp5",
            "spID": "5",
            "spmobileNumber": "94716895888",
            "spEmail": "thiwanka.vk@gmail.com",
            "messages": "Hi,We have sent you an important email to thiwanka.vk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp6",
            "spID": "6",
            "spmobileNumber": "94718412568",
            "spEmail": "chamikamspace@gmail.com",
            "messages": "Hi,We have sent you an important email to chamikamspace@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp7",
            "spID": "7",
            "spmobileNumber": "94719126420",
            "spEmail": "Sumithniroshan40@gmail.com",
            "messages": "Hi,We have sent you an important email to Sumithniroshan40@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp8",
            "spID": "8",
            "spmobileNumber": "94712337273",
            "spEmail": "lakminimendis2@gmail.com",
            "messages": "Hi,We have sent you an important email to lakminimendis2@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp9",
            "spID": "9",
            "spmobileNumber": "94718640290",
            "spEmail": "udithaishara05@gmail.com",
            "messages": "Hi,We have sent you an important email to udithaishara05@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp10",
            "spID": "10",
            "spmobileNumber": "94703970140",
            "spEmail": "kokilasandaruwan7@gmail.com",
            "messages": "Hi,We have sent you an important email to kokilasandaruwan7@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp11",
            "spID": "11",
            "spmobileNumber": "94702185642",
            "spEmail": "sandunmadushankagayashan@gmail.com",
            "messages": "Hi,We have sent you an important email to sandunmadushankagayashan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp12",
            "spID": "12",
            "spmobileNumber": "94710333430",
            "spEmail": "shashikaub@gmail.com",
            "messages": "Hi,We have sent you an important email to shashikaub@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp13",
            "spID": "13",
            "spmobileNumber": "94704857582",
            "spEmail": "Maheshkamadusanka3@gmail.com",
            "messages": "Hi,We have sent you an important email to Maheshkamadusanka3@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp14",
            "spID": "14",
            "spmobileNumber": "94710329668",
            "spEmail": "amalicpz@gmail.com",
            "messages": "Hi,We have sent you an important email to amalicpz@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp15",
            "spID": "15",
            "spmobileNumber": "94711330022",
            "spEmail": "amila48@gmail.com",
            "messages": "Hi,We have sent you an important email to amila48@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp16",
            "spID": "16",
            "spmobileNumber": "94704418769",
            "spEmail": "arunamobilenet@gmail.com",
            "messages": "Hi,We have sent you an important email to arunamobilenet@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp17",
            "spID": "17",
            "spmobileNumber": "94711717286",
            "spEmail": "Asanka0623@gmail.com",
            "messages": "Hi,We have sent you an important email to Asanka0623@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp18",
            "spID": "18",
            "spmobileNumber": "94713965115",
            "spEmail": "ashen.madushanka1997@gmail.com",
            "messages": "Hi,We have sent you an important email to ashen.madushanka1997@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp19",
            "spID": "19",
            "spmobileNumber": "94712327827",
            "spEmail": "bogodaemb@gmail.com",
            "messages": "Hi,We have sent you an important email to bogodaemb@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp20",
            "spID": "20",
            "spmobileNumber": "94701978272",
            "spEmail": "kasunbest18@gmail.com",
            "messages": "Hi,We have sent you an important email to kasunbest18@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp21",
            "spID": "21",
            "spmobileNumber": "94702759455",
            "spEmail": "indrajith@capitalfm.lk",
            "messages": "Hi,We have sent you an important email to indrajith@capitalfm.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp22",
            "spID": "22",
            "spmobileNumber": "94711604726",
            "spEmail": "cekarannagoda@gmail.com",
            "messages": "Hi,We have sent you an important email to cekarannagoda@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp23",
            "spID": "23",
            "spmobileNumber": "94715419944",
            "spEmail": "ayannawebsite@gmail.com",
            "messages": "Hi,We have sent you an important email to ayannawebsite@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp24",
            "spID": "24",
            "spmobileNumber": "94715199236",
            "spEmail": "chanakasampathabeysinghe@gmail.com",
            "messages": "Hi,We have sent you an important email to chanakasampathabeysinghe@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp25",
            "spID": "25",
            "spmobileNumber": "94702603137",
            "spEmail": "chandanaweerasooriya8@gmail.com",
            "messages": "Hi,We have sent you an important email to chandanaweerasooriya8@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp26",
            "spID": "26",
            "spmobileNumber": "94713355557",
            "spEmail": "ch.harshana@gmail.com",
            "messages": "Hi,We have sent you an important email to ch.harshana@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp27",
            "spID": "27",
            "spmobileNumber": "94713488229",
            "spEmail": "CHathuraedirisinhga1997@gmail.com",
            "messages": "Hi,We have sent you an important email to CHathuraedirisinhga1997@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp28",
            "spID": "28",
            "spmobileNumber": "94711294659",
            "spEmail": "coursenet.lk@gmail.com",
            "messages": "Hi,We have sent you an important email to coursenet.lk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp29",
            "spID": "29",
            "spmobileNumber": "94717472499",
            "spEmail": "Salithadeepal12345@gmail.com",
            "messages": "Hi,We have sent you an important email to Salithadeepal12345@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp30",
            "spID": "30",
            "spmobileNumber": "94714031008",
            "spEmail": "dilshansandeep31@gmail.com",
            "messages": "Hi,We have sent you an important email to dilshansandeep31@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp31",
            "spID": "31",
            "spmobileNumber": "94717904508",
            "spEmail": "dimuthuherath88@gmail.com",
            "messages": "Hi,We have sent you an important email to dimuthuherath88@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp32",
            "spID": "32",
            "spmobileNumber": "94715190021",
            "spEmail": "Dinukaekanayaka290@Gmail.com",
            "messages": "Hi,We have sent you an important email to Dinukaekanayaka290@Gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp33",
            "spID": "33",
            "spmobileNumber": "94717559111",
            "spEmail": "dinushpa90@gmail.com",
            "messages": "Hi,We have sent you an important email to dinushpa90@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp34",
            "spID": "34",
            "spmobileNumber": "94716321322",
            "spEmail": "dularikagayashani@gmail.com",
            "messages": "Hi,We have sent you an important email to dularikagayashani@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp35",
            "spID": "35",
            "spmobileNumber": "94718410364",
            "spEmail": "mgnharshan@gmail.com",
            "messages": "Hi,We have sent you an important email to mgnharshan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp36",
            "spID": "36",
            "spmobileNumber": "94717556342",
            "spEmail": "Onlinekuppiya@gmail.com",
            "messages": "Hi,We have sent you an important email to Onlinekuppiya@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp37",
            "spID": "37",
            "spmobileNumber": "94703697666",
            "spEmail": "anjanart@gmail.com",
            "messages": "Hi,We have sent you an important email to anjanart@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp38",
            "spID": "38",
            "spmobileNumber": "94715158166",
            "spEmail": "ekvinpeiris@gmail.com",
            "messages": "Hi,We have sent you an important email to ekvinpeiris@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp39",
            "spID": "39",
            "spmobileNumber": "94704553402",
            "spEmail": "elshaddaiiholdings@gmail.com",
            "messages": "Hi,We have sent you an important email to elshaddaiiholdings@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp40",
            "spID": "40",
            "spmobileNumber": "94711642369",
            "spEmail": "contact.gayan@gmail.com",
            "messages": "Hi,We have sent you an important email to contact.gayan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp41",
            "spID": "41",
            "spmobileNumber": "94717076160",
            "spEmail": "sampath@zmessenger.lk",
            "messages": "Hi,We have sent you an important email to sampath@zmessenger.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp42",
            "spID": "42",
            "spmobileNumber": "94714478649",
            "spEmail": "gayanud@gmail.com",
            "messages": "Hi,We have sent you an important email to gayanud@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp43",
            "spID": "43",
            "spmobileNumber": "94719344452",
            "spEmail": "gimhansachintha645@gmail.com",
            "messages": "Hi,We have sent you an important email to gimhansachintha645@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp44",
            "spID": "44",
            "spmobileNumber": "94712890930",
            "spEmail": "healthtipslk@gmail.com",
            "messages": "Hi,We have sent you an important email to healthtipslk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp45",
            "spID": "45",
            "spmobileNumber": "94712580003",
            "spEmail": "hemalsgroup@gmail.com",
            "messages": "Hi,We have sent you an important email to hemalsgroup@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp46",
            "spID": "46",
            "spmobileNumber": "94718367371",
            "spEmail": "hetadina@gmail.com",
            "messages": "Hi,We have sent you an important email to hetadina@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp47",
            "spID": "47",
            "spmobileNumber": "94715658488",
            "spEmail": "info@creativeslanka.com",
            "messages": "Hi,We have sent you an important email to info@creativeslanka.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp48",
            "spID": "48",
            "spmobileNumber": "94702213857",
            "spEmail": "isanka.madushanka00@gmail.com",
            "messages": "Hi,We have sent you an important email to isanka.madushanka00@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp49",
            "spID": "49",
            "spmobileNumber": "94703118411",
            "spEmail": "isurusomarathne2@gmail.com",
            "messages": "Hi,We have sent you an important email to isurusomarathne2@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp50",
            "spID": "50",
            "spmobileNumber": "94711166920",
            "spEmail": "info@itsignature.com",
            "messages": "Hi,We have sent you an important email to info@itsignature.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp51",
            "spID": "51",
            "spmobileNumber": "94712113949",
            "spEmail": "info@nerolanka.com",
            "messages": "Hi,We have sent you an important email to info@nerolanka.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp52",
            "spID": "52",
            "spmobileNumber": "94702081363",
            "spEmail": "trancitedispose@gmail.com",
            "messages": "Hi,We have sent you an important email to trancitedispose@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp53",
            "spID": "53",
            "spmobileNumber": "94704884848",
            "spEmail": "kasunjayarathna505@gmail.com",
            "messages": "Hi,We have sent you an important email to kasunjayarathna505@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp54",
            "spID": "54",
            "spmobileNumber": "94717177010",
            "spEmail": "kdkrun@gmail.com",
            "messages": "Hi,We have sent you an important email to kdkrun@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp55",
            "spID": "55",
            "spmobileNumber": "94711331706",
            "spEmail": "sanjayaheiyantuduwa@hotmail.com",
            "messages": "Hi,We have sent you an important email to sanjayaheiyantuduwa@hotmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp56",
            "spID": "56",
            "spmobileNumber": "94712170323",
            "spEmail": "kushanudesh@gmail.com",
            "messages": "Hi,We have sent you an important email to kushanudesh@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp57",
            "spID": "57",
            "spmobileNumber": "94710865070",
            "spEmail": "gamagekusumawathi0@gmail.com",
            "messages": "Hi,We have sent you an important email to gamagekusumawathi0@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp58",
            "spID": "58",
            "spmobileNumber": "94714389414",
            "spEmail": "lahirunilanga55@gmail.com",
            "messages": "Hi,We have sent you an important email to lahirunilanga55@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp59",
            "spID": "59",
            "spmobileNumber": "94702878487",
            "spEmail": "lahirudilshan641@gmail.com",
            "messages": "Hi,We have sent you an important email to lahirudilshan641@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp60",
            "spID": "60",
            "spmobileNumber": "94719093926",
            "spEmail": "laylarzone@gmail.com",
            "messages": "Hi,We have sent you an important email to laylarzone@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp61",
            "spID": "61",
            "spmobileNumber": "94715785057",
            "spEmail": "djlahirunuwan@gmail.com",
            "messages": "Hi,We have sent you an important email to djlahirunuwan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp62",
            "spID": "62",
            "spmobileNumber": "94710907607",
            "spEmail": "lalithgunasekar@gmail.com",
            "messages": "Hi,We have sent you an important email to lalithgunasekar@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp63",
            "spID": "63",
            "spmobileNumber": "94719656798",
            "spEmail": "madhukamelan@gmail.com",
            "messages": "Hi,We have sent you an important email to madhukamelan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp64",
            "spID": "64",
            "spmobileNumber": "94705356178",
            "spEmail": "Madushankakumara500@gmail.com",
            "messages": "Hi,We have sent you an important email to Madushankakumara500@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp65",
            "spID": "65",
            "spmobileNumber": "94704523269",
            "spEmail": "rekiyapiyasa0@gmail.com",
            "messages": "Hi,We have sent you an important email to rekiyapiyasa0@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp66",
            "spID": "66",
            "spmobileNumber": "94704521759",
            "spEmail": "matheemathee69@gmail.com",
            "messages": "Hi,We have sent you an important email to matheemathee69@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp67",
            "spID": "67",
            "spmobileNumber": "94704839270",
            "spEmail": "maheshkamausanka3@gmail.com",
            "messages": "Hi,We have sent you an important email to maheshkamausanka3@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp68",
            "spID": "68",
            "spmobileNumber": "94703584666",
            "spEmail": "mayaentertainments@yahoo.com",
            "messages": "Hi,We have sent you an important email to mayaentertainments@yahoo.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp69",
            "spID": "69",
            "spmobileNumber": "94711635807",
            "spEmail": "mithra205@gmail.com",
            "messages": "Hi,We have sent you an important email to mithra205@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp70",
            "spID": "70",
            "spmobileNumber": "94713307307",
            "spEmail": "ruwan@mobios.lk",
            "messages": "Hi,We have sent you an important email to ruwan@mobios.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp71",
            "spID": "71",
            "spmobileNumber": "94705324835",
            "spEmail": "Nadeeranuwan97@gmail.com",
            "messages": "Hi,We have sent you an important email to Nadeeranuwan97@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp72",
            "spID": "72",
            "spmobileNumber": "94712377568",
            "spEmail": "dgnandasena54@gmail.com",
            "messages": "Hi,We have sent you an important email to dgnandasena54@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp73",
            "spID": "73",
            "spmobileNumber": "94712921292",
            "spEmail": "eshannaveen@gmail.com",
            "messages": "Hi,We have sent you an important email to eshannaveen@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp74",
            "spID": "74",
            "spmobileNumber": "94714413236",
            "spEmail": "nevilgamlath@yahoo.com",
            "messages": "Hi,We have sent you an important email to nevilgamlath@yahoo.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp75",
            "spID": "75",
            "spmobileNumber": "94716519996",
            "spEmail": "pasinduyathindra@gmail.com",
            "messages": "Hi,We have sent you an important email to pasinduyathindra@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp76",
            "spID": "76",
            "spmobileNumber": "94711075164",
            "spEmail": "nayonnmrfb@gmail.com",
            "messages": "Hi,We have sent you an important email to nayonnmrfb@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp77",
            "spID": "77",
            "spmobileNumber": "94718510566",
            "spEmail": "studio7moratuwa@gmail.com",
            "messages": "Hi,We have sent you an important email to studio7moratuwa@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp78",
            "spID": "78",
            "spmobileNumber": "94715785378",
            "spEmail": "slp.dins@gmail.com",
            "messages": "Hi,We have sent you an important email to slp.dins@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp79",
            "spID": "79",
            "spmobileNumber": "94714108753",
            "spEmail": "prabashininilushika@gmail.com",
            "messages": "Hi,We have sent you an important email to prabashininilushika@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp80",
            "spID": "80",
            "spmobileNumber": "94716484115",
            "spEmail": "me@prasadonline.com",
            "messages": "Hi,We have sent you an important email to me@prasadonline.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp81",
            "spID": "81",
            "spmobileNumber": "94711311611",
            "spEmail": "radnr2013@gmail.com",
            "messages": "Hi,We have sent you an important email to radnr2013@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp82",
            "spID": "82",
            "spmobileNumber": "94715754675",
            "spEmail": "ranjansampath2@gmail.com",
            "messages": "Hi,We have sent you an important email to ranjansampath2@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp83",
            "spID": "83",
            "spmobileNumber": "94704473022",
            "spEmail": "ranjanakumara500@gmail.com",
            "messages": "Hi,We have sent you an important email to ranjanakumara500@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp84",
            "spID": "84",
            "spmobileNumber": "94713644772",
            "spEmail": "rasikaprabathranathunga@gmail.com",
            "messages": "Hi,We have sent you an important email to rasikaprabathranathunga@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp85",
            "spID": "85",
            "spmobileNumber": "94710197992",
            "spEmail": "ravindulasitha1994@gmail.com",
            "messages": "Hi,We have sent you an important email to ravindulasitha1994@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp86",
            "spID": "86",
            "spmobileNumber": "94714379048",
            "spEmail": "rcreationssl@gmail.com",
            "messages": "Hi,We have sent you an important email to rcreationssl@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp87",
            "spID": "87",
            "spmobileNumber": "94711398396",
            "spEmail": "rojithonline@gmail.com",
            "messages": "Hi,We have sent you an important email to rojithonline@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp88",
            "spID": "88",
            "spmobileNumber": "94711504162",
            "spEmail": "rumeshf1@gmail.com",
            "messages": "Hi,We have sent you an important email to rumeshf1@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp89",
            "spID": "89",
            "spmobileNumber": "94712801785",
            "spEmail": "Jpyohan3@gmail.com",
            "messages": "Hi,We have sent you an important email to Jpyohan3@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp90",
            "spID": "90",
            "spmobileNumber": "94719858156",
            "spEmail": "kusalj08@gmail.com",
            "messages": "Hi,We have sent you an important email to kusalj08@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp91",
            "spID": "91",
            "spmobileNumber": "94718968690",
            "spEmail": "sachithramm@gmail.com",
            "messages": "Hi,We have sent you an important email to sachithramm@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp92",
            "spID": "92",
            "spmobileNumber": "94711607029",
            "spEmail": "rhgunathilake87@yahoo.com",
            "messages": "Hi,We have sent you an important email to rhgunathilake87@yahoo.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp93",
            "spID": "93",
            "spmobileNumber": "94717505188",
            "spEmail": "info.buddika95@gmail.com",
            "messages": "Hi,We have sent you an important email to info.buddika95@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp94",
            "spID": "94",
            "spmobileNumber": "94704105950",
            "spEmail": "Nuwansankalpa7@gmail.com",
            "messages": "Hi,We have sent you an important email to Nuwansankalpa7@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp95",
            "spID": "95",
            "spmobileNumber": "94717277996",
            "spEmail": "chinthanasanketh@gmail.com",
            "messages": "Hi,We have sent you an important email to chinthanasanketh@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp96",
            "spID": "96",
            "spmobileNumber": "94714865201",
            "spEmail": "scaflanka@gmail.com",
            "messages": "Hi,We have sent you an important email to scaflanka@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp97",
            "spID": "97",
            "spmobileNumber": "94701539828",
            "spEmail": "chathuranga9827@gmail.com",
            "messages": "Hi,We have sent you an important email to chathuranga9827@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp98",
            "spID": "98",
            "spmobileNumber": "94703268178",
            "spEmail": "shagamage1st@gmail.com",
            "messages": "Hi,We have sent you an important email to shagamage1st@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp99",
            "spID": "99",
            "spmobileNumber": "94716297594",
            "spEmail": "djsharox@gmail.com",
            "messages": "Hi,We have sent you an important email to djsharox@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp100",
            "spID": "100",
            "spmobileNumber": "94703686799",
            "spEmail": "shaangayaan@gmail.com",
            "messages": "Hi,We have sent you an important email to shaangayaan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp101",
            "spID": "101",
            "spmobileNumber": "94719335984",
            "spEmail": "nilankasoftde@gmail.com",
            "messages": "Hi,We have sent you an important email to nilankasoftde@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp102",
            "spID": "102",
            "spmobileNumber": "94716550512",
            "spEmail": "tharindu@getshoutout.com",
            "messages": "Hi,We have sent you an important email to tharindu@getshoutout.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp103",
            "spID": "103",
            "spmobileNumber": "94718698069",
            "spEmail": "rushan@voa.lk",
            "messages": "Hi,We have sent you an important email to rushan@voa.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp104",
            "spID": "104",
            "spmobileNumber": "94718909932",
            "spEmail": "kelum7732@gmail.com",
            "messages": "Hi,We have sent you an important email to kelum7732@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp105",
            "spID": "105",
            "spmobileNumber": "94711137451",
            "spEmail": "harithakaushan.slk@gmail.com",
            "messages": "Hi,We have sent you an important email to harithakaushan.slk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp106",
            "spID": "106",
            "spmobileNumber": "94719531144",
            "spEmail": "newsalert@slbc.lk",
            "messages": "Hi,We have sent you an important email to newsalert@slbc.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp107",
            "spID": "107",
            "spmobileNumber": "94713712787",
            "spEmail": "cbtopiksl@gmail.com",
            "messages": "Hi,We have sent you an important email to cbtopiksl@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp108",
            "spID": "108",
            "spmobileNumber": "94716945189",
            "spEmail": "sudeeramadushan10@gmail.com",
            "messages": "Hi,We have sent you an important email to sudeeramadushan10@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp109",
            "spID": "109",
            "spmobileNumber": "94715196319",
            "spEmail": "sumudu.sm@gmail.com",
            "messages": "Hi,We have sent you an important email to sumudu.sm@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp110",
            "spID": "110",
            "spmobileNumber": "94704807229",
            "spEmail": "susithkulathunga1@gmail.com",
            "messages": "Hi,We have sent you an important email to susithkulathunga1@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp111",
            "spID": "111",
            "spmobileNumber": "94714525555",
            "spEmail": "Info@taxadvisor.lk",
            "messages": "Hi,We have sent you an important email to Info@taxadvisor.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp112",
            "spID": "112",
            "spmobileNumber": "94713134374",
            "spEmail": "mendisapp@gmail.com",
            "messages": "Hi,We have sent you an important email to mendisapp@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp113",
            "spID": "113",
            "spmobileNumber": "94703929829",
            "spEmail": "katoperera@gmail.com",
            "messages": "Hi,We have sent you an important email to katoperera@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp114",
            "spID": "114",
            "spmobileNumber": "94719965558",
            "spEmail": "visionofhumanitarian@gmail.com",
            "messages": "Hi,We have sent you an important email to visionofhumanitarian@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp115",
            "spID": "115",
            "spmobileNumber": "94716647066",
            "spEmail": "risingkstarss@gmail.com",
            "messages": "Hi,We have sent you an important email to risingkstarss@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp116",
            "spID": "116",
            "spmobileNumber": "94716518755",
            "spEmail": "vishwalakadevelop@gmail.com",
            "messages": "Hi,We have sent you an important email to vishwalakadevelop@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp117",
            "spID": "117",
            "spmobileNumber": "94718111976",
            "spEmail": "wije26@gmail.com",
            "messages": "Hi,We have sent you an important email to wije26@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        }
    ]

    const spdetails1 = [
        {
            "name": "sp1",
            "spID": "1",
            "spmobileNumber": "94702422450",
            "spEmail": "tissera.malithi@gmail.com",
            "messages": "Hi,We have sent you an important email to tissera.malithi@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp2",
            "spID": "2",
            "spmobileNumber": "94702520785",
            "spEmail": "dilummanjula72@gmail.com",
            "messages": "Hi,We have sent you an important email to dilummanjula72@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp3",
            "spID": "3",
            "spmobileNumber": "94703583040",
            "spEmail": "abewikramaarach@gmail.com",
            "messages": "Hi,We have sent you an important email to abewikramaarach@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp4",
            "spID": "4",
            "spmobileNumber": "94703811920",
            "spEmail": "sandun.idemart@gmail.com",
            "messages": "Hi,We have sent you an important email to sandun.idemart@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp5",
            "spID": "5",
            "spmobileNumber": "94716895888",
            "spEmail": "thiwanka.vk@gmail.com",
            "messages": "Hi,We have sent you an important email to thiwanka.vk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp6",
            "spID": "6",
            "spmobileNumber": "94718412568",
            "spEmail": "chamikamspace@gmail.com",
            "messages": "Hi,We have sent you an important email to chamikamspace@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp7",
            "spID": "7",
            "spmobileNumber": "94719126420",
            "spEmail": "Sumithniroshan40@gmail.com",
            "messages": "Hi,We have sent you an important email to Sumithniroshan40@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp8",
            "spID": "8",
            "spmobileNumber": "94712337273",
            "spEmail": "lakminimendis2@gmail.com",
            "messages": "Hi,We have sent you an important email to lakminimendis2@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp9",
            "spID": "9",
            "spmobileNumber": "94718640290",
            "spEmail": "udithaishara05@gmail.com",
            "messages": "Hi,We have sent you an important email to udithaishara05@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp10",
            "spID": "10",
            "spmobileNumber": "94703970140",
            "spEmail": "kokilasandaruwan7@gmail.com",
            "messages": "Hi,We have sent you an important email to kokilasandaruwan7@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp11",
            "spID": "11",
            "spmobileNumber": "94702185642",
            "spEmail": "sandunmadushankagayashan@gmail.com",
            "messages": "Hi,We have sent you an important email to sandunmadushankagayashan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp12",
            "spID": "12",
            "spmobileNumber": "94710333430",
            "spEmail": "shashikaub@gmail.com",
            "messages": "Hi,We have sent you an important email to shashikaub@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp13",
            "spID": "13",
            "spmobileNumber": "94704857582",
            "spEmail": "Maheshkamadusanka3@gmail.com",
            "messages": "Hi,We have sent you an important email to Maheshkamadusanka3@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp14",
            "spID": "14",
            "spmobileNumber": "94710329668",
            "spEmail": "amalicpz@gmail.com",
            "messages": "Hi,We have sent you an important email to amalicpz@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp15",
            "spID": "15",
            "spmobileNumber": "94711330022",
            "spEmail": "amila48@gmail.com",
            "messages": "Hi,We have sent you an important email to amila48@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp16",
            "spID": "16",
            "spmobileNumber": "94704418769",
            "spEmail": "arunamobilenet@gmail.com",
            "messages": "Hi,We have sent you an important email to arunamobilenet@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp17",
            "spID": "17",
            "spmobileNumber": "94711717286",
            "spEmail": "Asanka0623@gmail.com",
            "messages": "Hi,We have sent you an important email to Asanka0623@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp18",
            "spID": "18",
            "spmobileNumber": "94713965115",
            "spEmail": "ashen.madushanka1997@gmail.com",
            "messages": "Hi,We have sent you an important email to ashen.madushanka1997@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp19",
            "spID": "19",
            "spmobileNumber": "94712327827",
            "spEmail": "bogodaemb@gmail.com",
            "messages": "Hi,We have sent you an important email to bogodaemb@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp20",
            "spID": "20",
            "spmobileNumber": "94701978272",
            "spEmail": "kasunbest18@gmail.com",
            "messages": "Hi,We have sent you an important email to kasunbest18@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp21",
            "spID": "21",
            "spmobileNumber": "94702759455",
            "spEmail": "indrajith@capitalfm.lk",
            "messages": "Hi,We have sent you an important email to indrajith@capitalfm.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp22",
            "spID": "22",
            "spmobileNumber": "94711604726",
            "spEmail": "cekarannagoda@gmail.com",
            "messages": "Hi,We have sent you an important email to cekarannagoda@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp23",
            "spID": "23",
            "spmobileNumber": "94715419944",
            "spEmail": "ayannawebsite@gmail.com",
            "messages": "Hi,We have sent you an important email to ayannawebsite@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp24",
            "spID": "24",
            "spmobileNumber": "94715199236",
            "spEmail": "chanakasampathabeysinghe@gmail.com",
            "messages": "Hi,We have sent you an important email to chanakasampathabeysinghe@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp25",
            "spID": "25",
            "spmobileNumber": "94702603137",
            "spEmail": "chandanaweerasooriya8@gmail.com",
            "messages": "Hi,We have sent you an important email to chandanaweerasooriya8@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp26",
            "spID": "26",
            "spmobileNumber": "94713355557",
            "spEmail": "ch.harshana@gmail.com",
            "messages": "Hi,We have sent you an important email to ch.harshana@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp27",
            "spID": "27",
            "spmobileNumber": "94713488229",
            "spEmail": "CHathuraedirisinhga1997@gmail.com",
            "messages": "Hi,We have sent you an important email to CHathuraedirisinhga1997@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp28",
            "spID": "28",
            "spmobileNumber": "94711294659",
            "spEmail": "coursenet.lk@gmail.com",
            "messages": "Hi,We have sent you an important email to coursenet.lk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp29",
            "spID": "29",
            "spmobileNumber": "94717472499",
            "spEmail": "Salithadeepal12345@gmail.com",
            "messages": "Hi,We have sent you an important email to Salithadeepal12345@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp30",
            "spID": "30",
            "spmobileNumber": "94714031008",
            "spEmail": "dilshansandeep31@gmail.com",
            "messages": "Hi,We have sent you an important email to dilshansandeep31@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp31",
            "spID": "31",
            "spmobileNumber": "94717904508",
            "spEmail": "dimuthuherath88@gmail.com",
            "messages": "Hi,We have sent you an important email to dimuthuherath88@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp32",
            "spID": "32",
            "spmobileNumber": "94715190021",
            "spEmail": "Dinukaekanayaka290@Gmail.com",
            "messages": "Hi,We have sent you an important email to Dinukaekanayaka290@Gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp33",
            "spID": "33",
            "spmobileNumber": "94717559111",
            "spEmail": "dinushpa90@gmail.com",
            "messages": "Hi,We have sent you an important email to dinushpa90@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp34",
            "spID": "34",
            "spmobileNumber": "94716321322",
            "spEmail": "dularikagayashani@gmail.com",
            "messages": "Hi,We have sent you an important email to dularikagayashani@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp35",
            "spID": "35",
            "spmobileNumber": "94718410364",
            "spEmail": "mgnharshan@gmail.com",
            "messages": "Hi,We have sent you an important email to mgnharshan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp36",
            "spID": "36",
            "spmobileNumber": "94717556342",
            "spEmail": "Onlinekuppiya@gmail.com",
            "messages": "Hi,We have sent you an important email to Onlinekuppiya@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp37",
            "spID": "37",
            "spmobileNumber": "94703697666",
            "spEmail": "anjanart@gmail.com",
            "messages": "Hi,We have sent you an important email to anjanart@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp38",
            "spID": "38",
            "spmobileNumber": "94715158166",
            "spEmail": "ekvinpeiris@gmail.com",
            "messages": "Hi,We have sent you an important email to ekvinpeiris@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp39",
            "spID": "39",
            "spmobileNumber": "94704553402",
            "spEmail": "elshaddaiiholdings@gmail.com",
            "messages": "Hi,We have sent you an important email to elshaddaiiholdings@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp40",
            "spID": "40",
            "spmobileNumber": "94711642369",
            "spEmail": "contact.gayan@gmail.com",
            "messages": "Hi,We have sent you an important email to contact.gayan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp41",
            "spID": "41",
            "spmobileNumber": "94717076160",
            "spEmail": "sampath@zmessenger.lk",
            "messages": "Hi,We have sent you an important email to sampath@zmessenger.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp42",
            "spID": "42",
            "spmobileNumber": "94714478649",
            "spEmail": "gayanud@gmail.com",
            "messages": "Hi,We have sent you an important email to gayanud@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp43",
            "spID": "43",
            "spmobileNumber": "94719344452",
            "spEmail": "gimhansachintha645@gmail.com",
            "messages": "Hi,We have sent you an important email to gimhansachintha645@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp44",
            "spID": "44",
            "spmobileNumber": "94712890930",
            "spEmail": "healthtipslk@gmail.com",
            "messages": "Hi,We have sent you an important email to healthtipslk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp45",
            "spID": "45",
            "spmobileNumber": "94712580003",
            "spEmail": "hemalsgroup@gmail.com",
            "messages": "Hi,We have sent you an important email to hemalsgroup@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp46",
            "spID": "46",
            "spmobileNumber": "94718367371",
            "spEmail": "hetadina@gmail.com",
            "messages": "Hi,We have sent you an important email to hetadina@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp47",
            "spID": "47",
            "spmobileNumber": "94715658488",
            "spEmail": "info@creativeslanka.com",
            "messages": "Hi,We have sent you an important email to info@creativeslanka.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp48",
            "spID": "48",
            "spmobileNumber": "94702213857",
            "spEmail": "isanka.madushanka00@gmail.com",
            "messages": "Hi,We have sent you an important email to isanka.madushanka00@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp49",
            "spID": "49",
            "spmobileNumber": "94703118411",
            "spEmail": "isurusomarathne2@gmail.com",
            "messages": "Hi,We have sent you an important email to isurusomarathne2@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp50",
            "spID": "50",
            "spmobileNumber": "94711166920",
            "spEmail": "info@itsignature.com",
            "messages": "Hi,We have sent you an important email to info@itsignature.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp51",
            "spID": "51",
            "spmobileNumber": "94712113949",
            "spEmail": "info@nerolanka.com",
            "messages": "Hi,We have sent you an important email to info@nerolanka.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp52",
            "spID": "52",
            "spmobileNumber": "94702081363",
            "spEmail": "trancitedispose@gmail.com",
            "messages": "Hi,We have sent you an important email to trancitedispose@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp53",
            "spID": "53",
            "spmobileNumber": "94704884848",
            "spEmail": "kasunjayarathna505@gmail.com",
            "messages": "Hi,We have sent you an important email to kasunjayarathna505@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp54",
            "spID": "54",
            "spmobileNumber": "94717177010",
            "spEmail": "kdkrun@gmail.com",
            "messages": "Hi,We have sent you an important email to kdkrun@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp55",
            "spID": "55",
            "spmobileNumber": "94711331706",
            "spEmail": "sanjayaheiyantuduwa@hotmail.com",
            "messages": "Hi,We have sent you an important email to sanjayaheiyantuduwa@hotmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp56",
            "spID": "56",
            "spmobileNumber": "94712170323",
            "spEmail": "kushanudesh@gmail.com",
            "messages": "Hi,We have sent you an important email to kushanudesh@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp57",
            "spID": "57",
            "spmobileNumber": "94710865070",
            "spEmail": "gamagekusumawathi0@gmail.com",
            "messages": "Hi,We have sent you an important email to gamagekusumawathi0@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp58",
            "spID": "58",
            "spmobileNumber": "94714389414",
            "spEmail": "lahirunilanga55@gmail.com",
            "messages": "Hi,We have sent you an important email to lahirunilanga55@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        }
    ]

    const spdetails2 = [
        {
            "name": "sp59",
            "spID": "59",
            "spmobileNumber": "94702878487",
            "spEmail": "lahirudilshan641@gmail.com",
            "messages": "Hi,We have sent you an important email to lahirudilshan641@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp60",
            "spID": "60",
            "spmobileNumber": "94719093926",
            "spEmail": "laylarzone@gmail.com",
            "messages": "Hi,We have sent you an important email to laylarzone@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp61",
            "spID": "61",
            "spmobileNumber": "94715785057",
            "spEmail": "djlahirunuwan@gmail.com",
            "messages": "Hi,We have sent you an important email to djlahirunuwan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp62",
            "spID": "62",
            "spmobileNumber": "94710907607",
            "spEmail": "lalithgunasekar@gmail.com",
            "messages": "Hi,We have sent you an important email to lalithgunasekar@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp63",
            "spID": "63",
            "spmobileNumber": "94719656798",
            "spEmail": "madhukamelan@gmail.com",
            "messages": "Hi,We have sent you an important email to madhukamelan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp64",
            "spID": "64",
            "spmobileNumber": "94705356178",
            "spEmail": "Madushankakumara500@gmail.com",
            "messages": "Hi,We have sent you an important email to Madushankakumara500@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp65",
            "spID": "65",
            "spmobileNumber": "94704523269",
            "spEmail": "rekiyapiyasa0@gmail.com",
            "messages": "Hi,We have sent you an important email to rekiyapiyasa0@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp66",
            "spID": "66",
            "spmobileNumber": "94704521759",
            "spEmail": "matheemathee69@gmail.com",
            "messages": "Hi,We have sent you an important email to matheemathee69@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp67",
            "spID": "67",
            "spmobileNumber": "94704839270",
            "spEmail": "maheshkamausanka3@gmail.com",
            "messages": "Hi,We have sent you an important email to maheshkamausanka3@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp68",
            "spID": "68",
            "spmobileNumber": "94703584666",
            "spEmail": "mayaentertainments@yahoo.com",
            "messages": "Hi,We have sent you an important email to mayaentertainments@yahoo.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp69",
            "spID": "69",
            "spmobileNumber": "94711635807",
            "spEmail": "mithra205@gmail.com",
            "messages": "Hi,We have sent you an important email to mithra205@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp70",
            "spID": "70",
            "spmobileNumber": "94713307307",
            "spEmail": "ruwan@mobios.lk",
            "messages": "Hi,We have sent you an important email to ruwan@mobios.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp71",
            "spID": "71",
            "spmobileNumber": "94705324835",
            "spEmail": "Nadeeranuwan97@gmail.com",
            "messages": "Hi,We have sent you an important email to Nadeeranuwan97@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp72",
            "spID": "72",
            "spmobileNumber": "94712377568",
            "spEmail": "dgnandasena54@gmail.com",
            "messages": "Hi,We have sent you an important email to dgnandasena54@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp73",
            "spID": "73",
            "spmobileNumber": "94712921292",
            "spEmail": "eshannaveen@gmail.com",
            "messages": "Hi,We have sent you an important email to eshannaveen@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp74",
            "spID": "74",
            "spmobileNumber": "94714413236",
            "spEmail": "nevilgamlath@yahoo.com",
            "messages": "Hi,We have sent you an important email to nevilgamlath@yahoo.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp75",
            "spID": "75",
            "spmobileNumber": "94716519996",
            "spEmail": "pasinduyathindra@gmail.com",
            "messages": "Hi,We have sent you an important email to pasinduyathindra@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp76",
            "spID": "76",
            "spmobileNumber": "94711075164",
            "spEmail": "nayonnmrfb@gmail.com",
            "messages": "Hi,We have sent you an important email to nayonnmrfb@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp77",
            "spID": "77",
            "spmobileNumber": "94718510566",
            "spEmail": "studio7moratuwa@gmail.com",
            "messages": "Hi,We have sent you an important email to studio7moratuwa@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp78",
            "spID": "78",
            "spmobileNumber": "94715785378",
            "spEmail": "slp.dins@gmail.com",
            "messages": "Hi,We have sent you an important email to slp.dins@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp79",
            "spID": "79",
            "spmobileNumber": "94714108753",
            "spEmail": "prabashininilushika@gmail.com",
            "messages": "Hi,We have sent you an important email to prabashininilushika@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp80",
            "spID": "80",
            "spmobileNumber": "94716484115",
            "spEmail": "me@prasadonline.com",
            "messages": "Hi,We have sent you an important email to me@prasadonline.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp81",
            "spID": "81",
            "spmobileNumber": "94711311611",
            "spEmail": "radnr2013@gmail.com",
            "messages": "Hi,We have sent you an important email to radnr2013@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp82",
            "spID": "82",
            "spmobileNumber": "94715754675",
            "spEmail": "ranjansampath2@gmail.com",
            "messages": "Hi,We have sent you an important email to ranjansampath2@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp83",
            "spID": "83",
            "spmobileNumber": "94704473022",
            "spEmail": "ranjanakumara500@gmail.com",
            "messages": "Hi,We have sent you an important email to ranjanakumara500@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp84",
            "spID": "84",
            "spmobileNumber": "94713644772",
            "spEmail": "rasikaprabathranathunga@gmail.com",
            "messages": "Hi,We have sent you an important email to rasikaprabathranathunga@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp85",
            "spID": "85",
            "spmobileNumber": "94710197992",
            "spEmail": "ravindulasitha1994@gmail.com",
            "messages": "Hi,We have sent you an important email to ravindulasitha1994@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp86",
            "spID": "86",
            "spmobileNumber": "94714379048",
            "spEmail": "rcreationssl@gmail.com",
            "messages": "Hi,We have sent you an important email to rcreationssl@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp87",
            "spID": "87",
            "spmobileNumber": "94711398396",
            "spEmail": "rojithonline@gmail.com",
            "messages": "Hi,We have sent you an important email to rojithonline@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp88",
            "spID": "88",
            "spmobileNumber": "94711504162",
            "spEmail": "rumeshf1@gmail.com",
            "messages": "Hi,We have sent you an important email to rumeshf1@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp89",
            "spID": "89",
            "spmobileNumber": "94712801785",
            "spEmail": "Jpyohan3@gmail.com",
            "messages": "Hi,We have sent you an important email to Jpyohan3@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp90",
            "spID": "90",
            "spmobileNumber": "94719858156",
            "spEmail": "kusalj08@gmail.com",
            "messages": "Hi,We have sent you an important email to kusalj08@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp91",
            "spID": "91",
            "spmobileNumber": "94718968690",
            "spEmail": "sachithramm@gmail.com",
            "messages": "Hi,We have sent you an important email to sachithramm@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp92",
            "spID": "92",
            "spmobileNumber": "94711607029",
            "spEmail": "rhgunathilake87@yahoo.com",
            "messages": "Hi,We have sent you an important email to rhgunathilake87@yahoo.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp93",
            "spID": "93",
            "spmobileNumber": "94717505188",
            "spEmail": "info.buddika95@gmail.com",
            "messages": "Hi,We have sent you an important email to info.buddika95@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp94",
            "spID": "94",
            "spmobileNumber": "94704105950",
            "spEmail": "Nuwansankalpa7@gmail.com",
            "messages": "Hi,We have sent you an important email to Nuwansankalpa7@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp95",
            "spID": "95",
            "spmobileNumber": "94717277996",
            "spEmail": "chinthanasanketh@gmail.com",
            "messages": "Hi,We have sent you an important email to chinthanasanketh@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp96",
            "spID": "96",
            "spmobileNumber": "94714865201",
            "spEmail": "scaflanka@gmail.com",
            "messages": "Hi,We have sent you an important email to scaflanka@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp97",
            "spID": "97",
            "spmobileNumber": "94701539828",
            "spEmail": "chathuranga9827@gmail.com",
            "messages": "Hi,We have sent you an important email to chathuranga9827@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp98",
            "spID": "98",
            "spmobileNumber": "94703268178",
            "spEmail": "shagamage1st@gmail.com",
            "messages": "Hi,We have sent you an important email to shagamage1st@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp99",
            "spID": "99",
            "spmobileNumber": "94716297594",
            "spEmail": "djsharox@gmail.com",
            "messages": "Hi,We have sent you an important email to djsharox@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp100",
            "spID": "100",
            "spmobileNumber": "94703686799",
            "spEmail": "shaangayaan@gmail.com",
            "messages": "Hi,We have sent you an important email to shaangayaan@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp101",
            "spID": "101",
            "spmobileNumber": "94719335984",
            "spEmail": "nilankasoftde@gmail.com",
            "messages": "Hi,We have sent you an important email to nilankasoftde@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp102",
            "spID": "102",
            "spmobileNumber": "94716550512",
            "spEmail": "tharindu@getshoutout.com",
            "messages": "Hi,We have sent you an important email to tharindu@getshoutout.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp103",
            "spID": "103",
            "spmobileNumber": "94718698069",
            "spEmail": "rushan@voa.lk",
            "messages": "Hi,We have sent you an important email to rushan@voa.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp104",
            "spID": "104",
            "spmobileNumber": "94718909932",
            "spEmail": "kelum7732@gmail.com",
            "messages": "Hi,We have sent you an important email to kelum7732@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp105",
            "spID": "105",
            "spmobileNumber": "94711137451",
            "spEmail": "harithakaushan.slk@gmail.com",
            "messages": "Hi,We have sent you an important email to harithakaushan.slk@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp106",
            "spID": "106",
            "spmobileNumber": "94719531144",
            "spEmail": "newsalert@slbc.lk",
            "messages": "Hi,We have sent you an important email to newsalert@slbc.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp107",
            "spID": "107",
            "spmobileNumber": "94713712787",
            "spEmail": "cbtopiksl@gmail.com",
            "messages": "Hi,We have sent you an important email to cbtopiksl@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp108",
            "spID": "108",
            "spmobileNumber": "94716945189",
            "spEmail": "sudeeramadushan10@gmail.com",
            "messages": "Hi,We have sent you an important email to sudeeramadushan10@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp109",
            "spID": "109",
            "spmobileNumber": "94715196319",
            "spEmail": "sumudu.sm@gmail.com",
            "messages": "Hi,We have sent you an important email to sumudu.sm@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp110",
            "spID": "110",
            "spmobileNumber": "94704807229",
            "spEmail": "susithkulathunga1@gmail.com",
            "messages": "Hi,We have sent you an important email to susithkulathunga1@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp111",
            "spID": "111",
            "spmobileNumber": "94714525555",
            "spEmail": "Info@taxadvisor.lk",
            "messages": "Hi,We have sent you an important email to Info@taxadvisor.lk on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp112",
            "spID": "112",
            "spmobileNumber": "94713134374",
            "spEmail": "mendisapp@gmail.com",
            "messages": "Hi,We have sent you an important email to mendisapp@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp113",
            "spID": "113",
            "spmobileNumber": "94703929829",
            "spEmail": "katoperera@gmail.com",
            "messages": "Hi,We have sent you an important email to katoperera@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp114",
            "spID": "114",
            "spmobileNumber": "94719965558",
            "spEmail": "visionofhumanitarian@gmail.com",
            "messages": "Hi,We have sent you an important email to visionofhumanitarian@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp115",
            "spID": "115",
            "spmobileNumber": "94716647066",
            "spEmail": "risingkstarss@gmail.com",
            "messages": "Hi,We have sent you an important email to risingkstarss@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp116",
            "spID": "116",
            "spmobileNumber": "94716518755",
            "spEmail": "vishwalakadevelop@gmail.com",
            "messages": "Hi,We have sent you an important email to vishwalakadevelop@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        },
        {
            "name": "sp117",
            "spID": "117",
            "spmobileNumber": "94718111976",
            "spEmail": "wije26@gmail.com",
            "messages": "Hi,We have sent you an important email to wije26@gmail.com on app migration process from mSpace & Inzpire platforms to mspace.lk. Pls check."
        }
    ]

    function smsSender(element) {
        return new Promise((resolve) => {
            axios.post('http://104.215.147.207:3003/sendSMS', {
                "appId": "APP_003797",
                "password": "89aef78f6c2f5c8b0ffaa56e0c725670",
                "message": element.messages,
                "alias": "mSpaceAdmin",
                "numbers": ["tel:" + element.spmobileNumber]
            }, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            })
                .then(response => {
                    const result = {
                        SPID: element.spID,
                        data: response.data.created
                    };
                    resolve(result);
                })
                .catch(error => {
                    const result = {
                        SPID: element.spID,
                        error: error
                    };
                    resolve(result);
                });
        });
    }
    //Call this Function with Test Data for Testing
    async function bulkLoader(array) {
        const newArray = [];
        for (item of array) {
            const newItem = await smsSender(item);
            newArray.push(newItem);
        };
        res.status(200).json({
            message: "Success...!",
            time: (t1 - t0),
            result: newArray
        });
    }

    const t0 = performance.now();

    bulkLoader(test); //test data for Testing...!

    const t1 = performance.now();
    const t = t1 - t0;

    console.log("Done....!");
    console.log("time:", t);


});

module.exports = router;