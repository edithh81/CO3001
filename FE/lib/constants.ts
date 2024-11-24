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
export const printerCampus = [
    {
        campus: "cs1",
        printers: [
            {
                id: 1,
                room: "B1-101",
                queue: 5,
                status: "available",
                info: {
                    model: "HP LaserJet Pro M404dn",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 2,
                room: "B1-102",
                queue: 2,
                status: "available",
                info: {
                    model: "Canon PIXMA G3010",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 3,
                room: "B1-201",
                queue: 7,
                status: "available",
                info: {
                    model: "Epson EcoTank L3210",
                    type: ["bw"],
                    functional: ["single", "double", "scan"],
                },
            },
            {
                id: 4,
                room: "B1-202",
                queue: 0,
                status: "available",
                info: {
                    model: "Brother HL-L2350DW",
                    type: ["bw"],
                    functional: ["single", "double"],
                },
            },
            {
                id: 5,
                room: "B1-301",
                queue: 10,
                status: "available",
                info: {
                    model: "HP OfficeJet Pro 9010",
                    type: ["bw"],
                    functional: ["single", "double", "scan"],
                },
            },
            {
                id: 6,
                room: "B1-302",
                queue: 3,
                status: "available",
                info: {
                    model: "Xerox Phaser 6510",
                    type: ["color"],
                    functional: ["single", "double"],
                },
            },
            {
                id: 7,
                room: "B1-401",
                queue: 8,
                status: "available",
                info: {
                    model: "Epson Workforce Pro WF-7840",
                    type: ["color"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 8,
                room: "B1-402",
                queue: 1,
                status: "available",
                info: {
                    model: "Canon i-SENSYS LBP6030B",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 9,
                room: "B1-501",
                queue: 4,
                status: "available",
                info: {
                    model: "Samsung Xpress M2070FW",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 10,
                room: "B1-502",
                queue: 6,
                status: "available",
                info: {
                    model: "Ricoh SP 210",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 11,
                room: "B1-601",
                queue: 9,
                status: "available",
                info: {
                    model: "HP DeskJet 2130",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 12,
                room: "B1-602",
                queue: 0,
                status: "available",
                info: {
                    model: "Lexmark MB2236adw",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 13,
                room: "B1-701",
                queue: 12,
                status: "available",
                info: {
                    model: "Epson L805",
                    type: ["color"],
                    functional: ["single"],
                },
            },
            {
                id: 14,
                room: "B1-702",
                queue: 2,
                status: "available",
                info: {
                    model: "Brother DCP-L2540DW",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 15,
                room: "B1-801",
                queue: 0,
                status: "available",
                info: {
                    model: "HP LaserJet MFP M227fdw",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 16,
                room: "B1-802",
                queue: 5,
                status: "available",
                info: {
                    model: "Canon SELPHY CP1300",
                    type: ["color"],
                    functional: ["single"],
                },
            },
            {
                id: 17,
                room: "B1-901",
                queue: 11,
                status: "available",
                info: {
                    model: "Epson SureColor P700",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 18,
                room: "B1-902",
                queue: 3,
                status: "available",
                info: {
                    model: "Xerox VersaLink C405",
                    type: ["color"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 19,
                room: "B1-1001",
                queue: 6,
                status: "available",
                info: {
                    model: "HP ENVY 5055",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 20,
                room: "B1-1002",
                queue: 7,
                status: "available",
                info: {
                    model: "Brother MFC-J995DW",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
        ],
    },
    {
        campus: "cs2",
        printers: [
            {
                id: 1,
                room: "B1-101",
                queue: 5,
                status: "available",
                info: {
                    model: "HP LaserJet Pro M404dn",
                    type: ["bw"],
                    functional: ["single", "double"],
                },
            },
            {
                id: 2,
                room: "B1-102",
                queue: 2,
                status: "available",
                info: {
                    model: "Canon PIXMA G3010",
                    type: ["bw"],
                    functional: ["single", "double", "scan"],
                },
            },
            {
                id: 3,
                room: "B1-201",
                queue: 7,
                status: "available",
                info: {
                    model: "Epson EcoTank L3210",
                    type: ["bw"],
                    functional: ["single", "double", "scan"],
                },
            },
            {
                id: 4,
                room: "B1-202",
                queue: 0,
                status: "available",
                info: {
                    model: "Brother HL-L2350DW",
                    type: ["bw"],
                    functional: ["single", "double"],
                },
            },
            {
                id: 5,
                room: "B1-301",
                queue: 10,
                status: "available",
                info: {
                    model: "HP OfficeJet Pro 9010",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 6,
                room: "B1-302",
                queue: 3,
                status: "available",
                info: {
                    model: "Xerox Phaser 6510",
                    type: ["color"],
                    functional: ["single"],
                },
            },
            {
                id: 7,
                room: "B1-401",
                queue: 8,
                status: "available",
                info: {
                    model: "Epson Workforce Pro WF-7840",
                    type: ["color"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 8,
                room: "B1-402",
                queue: 1,
                status: "available",
                info: {
                    model: "Canon i-SENSYS LBP6030B",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 9,
                room: "B1-501",
                queue: 4,
                status: "available",
                info: {
                    model: "Samsung Xpress M2070FW",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 10,
                room: "B1-502",
                queue: 6,
                status: "available",
                info: {
                    model: "Ricoh SP 210",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 11,
                room: "B1-601",
                queue: 9,
                status: "available",
                info: {
                    model: "HP DeskJet 2130",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 12,
                room: "B1-602",
                queue: 0,
                status: "available",
                info: {
                    model: "Lexmark MB2236adw",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 13,
                room: "B1-701",
                queue: 12,
                status: "available",
                info: {
                    model: "Epson L805",
                    type: ["color"],
                    functional: ["single"],
                },
            },
            {
                id: 14,
                room: "B1-702",
                queue: 2,
                status: "available",
                info: {
                    model: "Brother DCP-L2540DW",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 15,
                room: "B1-801",
                queue: 0,
                status: "available",
                info: {
                    model: "HP LaserJet MFP M227fdw",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 16,
                room: "B1-802",
                queue: 5,
                status: "available",
                info: {
                    model: "Canon SELPHY CP1300",
                    type: ["color"],
                    functional: ["single"],
                },
            },
            {
                id: 17,
                room: "B1-901",
                queue: 11,
                status: "available",
                info: {
                    model: "Epson SureColor P700",
                    type: ["bw"],
                    functional: ["single"],
                },
            },
            {
                id: 18,
                room: "B1-902",
                queue: 3,
                status: "available",
                info: {
                    model: "Xerox VersaLink C405",
                    type: ["color"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 19,
                room: "B1-1001",
                queue: 6,
                status: "available",
                info: {
                    model: "HP ENVY 5055",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
            {
                id: 20,
                room: "B1-1002",
                queue: 7,
                status: "available",
                info: {
                    model: "Brother MFC-J995DW",
                    type: ["bw"],
                    functional: ["single", "scan"],
                },
            },
        ],
    },
];
