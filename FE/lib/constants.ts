import { printerDetail } from "@/types";
export const campus = [
    {
        name: "Lý Thường Kiệt",
        id: "cs1",
        total: 10,
        available: 5,
    },
    {
        name: "Dĩ An",
        id: "cs2",
        total: 10,
        available: 5,
    },
];

// mockdata
export const printerCampus: printerDetail[] = [
    {
        id: 1,
        campusId: "cs1",
        room: "B1-101",
        queue: 3,
        status: "working",
        info: {
            model: "HP LaserJet Pro M404dn",
            type: ["bw"],
            functional: ["single"],
        },
    },
    {
        id: 2,
        campusId: "cs1",
        room: "B1-102",
        queue: 7,
        status: "maintenance",
        info: {
            model: "Canon PIXMA G4010",
            type: ["color", "bw"],
            functional: ["single", "scan"],
        },
    },
    {
        id: 3,
        campusId: "cs2",
        room: "B2-201",
        queue: 0,
        status: "working",
        info: {
            model: "Epson EcoTank L3250",
            type: ["bw"],
            functional: ["single", "double"],
        },
    },
    {
        id: 4,
        campusId: "cs2",
        room: "B2-202",
        queue: 5,
        status: "working",
        info: {
            model: "Brother HL-L3270CDW",
            type: ["color"],
            functional: ["single", "double"],
        },
    },
    {
        id: 5,
        campusId: "cs1",
        room: "B1-301",
        queue: 10,
        status: "working",
        info: {
            model: "HP OfficeJet Pro 9025",
            type: ["color"],
            functional: ["single", "double", "scan"],
        },
    },
    {
        id: 6,
        campusId: "cs2",
        room: "B2-302",
        queue: 2,
        status: "working",
        info: {
            model: "Xerox VersaLink B405",
            type: ["bw"],
            functional: ["single", "double"],
        },
    },
    {
        id: 7,
        campusId: "cs1",
        room: "B1-401",
        queue: 4,
        status: "maintenance",
        info: {
            model: "Epson Workforce WF-2830",
            type: ["color"],
            functional: ["single", "scan"],
        },
    },
    {
        id: 8,
        campusId: "cs2",
        room: "B2-402",
        queue: 1,
        status: "working",
        info: {
            model: "Canon i-SENSYS LBP623Cdw",
            type: ["bw"],
            functional: ["single"],
        },
    },
    {
        id: 9,
        campusId: "cs1",
        room: "B1-501",
        queue: 8,
        status: "working",
        info: {
            model: "Samsung Xpress SL-M2835DW",
            type: ["bw"],
            functional: ["single", "double"],
        },
    },
    {
        id: 10,
        campusId: "cs2",
        room: "B2-502",
        queue: 6,
        status: "working",
        info: {
            model: "Ricoh SP C261DNw",
            type: ["color"],
            functional: ["single"],
        },
    },
];
