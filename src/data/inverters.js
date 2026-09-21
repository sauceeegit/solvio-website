// Solis inverter catalogue — 15 approved items across 6 categories.
// Content only; InvertersPage.jsx renders it. Spec values are verbatim from the
// manufacturer datasheet for the exact model column — unknown fields are omitted,
// never inferred. Product photography and the official page links come from
// solisinverters.com (see `source` per item); most are series/family artwork, which
// the per-card caption states. Model IDs and units are never translated.

export const inverterCategories = [
    {
      "key": "single-phase-grid-tied",
      "en": "Single-phase grid-tied",
      "th": "อินเวอร์เตอร์ออนกริด 1 เฟส",
      "guide_en": "Grid-tied string inverters for single-phase residential rooftops with no battery.",
      "guide_th": "อินเวอร์เตอร์ออนกริดแบบสตริง สำหรับหลังคาบ้านระบบไฟ 1 เฟส ไม่มีแบตเตอรี่"
    },
    {
      "key": "single-phase-lv-hybrid",
      "en": "Single-phase LV hybrid",
      "th": "ไฮบริดแบตเตอรี่แรงดันต่ำ 1 เฟส",
      "guide_en": "Hybrid inverters for 40–60 V low-voltage battery storage with a backup output.",
      "guide_th": "อินเวอร์เตอร์ไฮบริดสำหรับแบตเตอรี่แรงดันต่ำ 40–60 โวลต์ พร้อมไฟสำรอง"
    },
    {
      "key": "three-phase-lv-hybrid",
      "en": "Three-phase LV hybrid",
      "th": "ไฮบริดแบตเตอรี่แรงดันต่ำ 3 เฟส",
      "guide_en": "Three-phase hybrid inverters for low-voltage battery storage, DC and AC coupling.",
      "guide_th": "อินเวอร์เตอร์ไฮบริด 3 เฟส สำหรับแบตเตอรี่แรงดันต่ำ รองรับการต่อร่วมแบบ DC และ AC"
    },
    {
      "key": "three-phase-hv-hybrid",
      "en": "Three-phase HV hybrid",
      "th": "ไฮบริดแบตเตอรี่แรงดันสูง 3 เฟส",
      "guide_en": "Commercial and industrial hybrid inverters using high-voltage battery strings.",
      "guide_th": "อินเวอร์เตอร์ไฮบริดสำหรับงานพาณิชย์และอุตสาหกรรม ใช้แบตเตอรี่แรงดันสูง"
    },
    {
      "key": "commercial-utility-grid-tied",
      "en": "Commercial & utility grid-tied",
      "th": "ออนกริดเชิงพาณิชย์และยูทิลิตี้",
      "guide_en": "Large grid-tied inverters for commercial rooftops and utility-scale plants.",
      "guide_th": "อินเวอร์เตอร์ออนกริดขนาดใหญ่ สำหรับหลังคาเชิงพาณิชย์และโรงไฟฟ้าระดับยูทิลิตี้"
    },
    {
      "key": "monitoring-connectivity",
      "en": "Monitoring & connectivity",
      "th": "การติดตามระบบและการเชื่อมต่อ",
      "guide_en": "The manufacturer monitoring platform and the data loggers that feed it.",
      "guide_th": "แพลตฟอร์มติดตามระบบของผู้ผลิต และดาต้าล็อกเกอร์ที่ส่งข้อมูลเข้าแพลตฟอร์ม"
    }
  ];

export const inverters = [
    {
      "id": "s6-gr1p2-5k-s",
      "model": "S6-GR1P2.5K-S",
      "familyOnly": false,
      "family": "S6-GR1P(2.5-6)K-S",
      "cat": "single-phase-grid-tied",
      "badges": {
        "en": [
          "Grid-tied",
          "1-phase"
        ],
        "th": [
          "ออนกริด",
          "1 เฟส"
        ]
      },
      "rated": {
        "en": "2.5 kW AC, single-phase",
        "th": "2.5 กิโลวัตต์ AC, 1 เฟส"
      },
      "desc": {
        "en": "2.5 kW single-phase grid-tied string inverter for small residential rooftops.",
        "th": "อินเวอร์เตอร์ออนกริด 1 เฟส ขนาด 2.5 กิโลวัตต์ สำหรับหลังคาบ้านขนาดเล็ก"
      },
      "img": "inverters/official-08.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-GR1P(2.5-6)K-S series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-GR1P(2.5-6)K-S เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/solarinverter17/S6_2,5_6kW_S_global.html",
        "imageUrl": "https://cmsdata.solisinverters.com/uploads/image/20230424/imB3WBqxYlYJ0au2MYSlOBVEoNv8LfnlAYmHllRT.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power",
          "label": {
            "en": "Rated output power",
            "th": "กำลังไฟขาออกพิกัด"
          },
          "value": "2.5 kW"
        },
        {
          "field": "max_apparent_output_power",
          "label": {
            "en": "Max apparent output power",
            "th": "กำลังไฟปรากฏสูงสุด"
          },
          "value": "2.5 kVA"
        },
        {
          "field": "recommended_max_pv_power",
          "label": {
            "en": "Recommended max PV power",
            "th": "กำลังไฟ PV สูงสุดที่แนะนำ"
          },
          "value": "3.75 kW"
        },
        {
          "field": "max_input_voltage",
          "label": {
            "en": "Max input voltage",
            "th": "แรงดันขาเข้าสูงสุด"
          },
          "value": "550 V"
        },
        {
          "field": "mppt_number_and_strings",
          "label": {
            "en": "MPPTs / strings",
            "th": "จำนวน MPPT / สตริง"
          },
          "value": "2 / 2"
        },
        {
          "field": "ingress_protection",
          "label": {
            "en": "Ingress protection",
            "th": "ระดับการป้องกัน (IP)"
          },
          "value": "IP66"
        }
      ],
      "notes": [
        {
          "en": "Grid-connection standards in the manufacturer datasheet are not a statement of Thai MEA/PEA approval.",
          "th": "มาตรฐานการเชื่อมต่อโครงข่ายในเอกสารของผู้ผลิต ไม่ใช่การยืนยันการรับรองจาก กฟน./กฟภ. ของไทย"
        }
      ]
    },
    {
      "id": "s6-gr1p3k-s",
      "model": "S6-GR1P3K-S",
      "familyOnly": false,
      "family": "S6-GR1P(2.5-6)K-S",
      "cat": "single-phase-grid-tied",
      "badges": {
        "en": [
          "Grid-tied",
          "1-phase"
        ],
        "th": [
          "ออนกริด",
          "1 เฟส"
        ]
      },
      "rated": {
        "en": "3 kW AC, single-phase",
        "th": "3 กิโลวัตต์ AC, 1 เฟส"
      },
      "desc": {
        "en": "3 kW single-phase grid-tied string inverter for residential rooftops.",
        "th": "อินเวอร์เตอร์ออนกริด 1 เฟส ขนาด 3 กิโลวัตต์ สำหรับหลังคาบ้าน"
      },
      "img": "inverters/official-08.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-GR1P(2.5-6)K-S series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-GR1P(2.5-6)K-S เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/solarinverter17/S6_2,5_6kW_S_global.html",
        "imageUrl": "https://cmsdata.solisinverters.com/uploads/image/20230424/imB3WBqxYlYJ0au2MYSlOBVEoNv8LfnlAYmHllRT.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power",
          "label": {
            "en": "Rated output power",
            "th": "กำลังไฟขาออกพิกัด"
          },
          "value": "3 kW"
        },
        {
          "field": "max_apparent_output_power",
          "label": {
            "en": "Max apparent output power",
            "th": "กำลังไฟปรากฏสูงสุด"
          },
          "value": "3 kVA"
        },
        {
          "field": "recommended_max_pv_power",
          "label": {
            "en": "Recommended max PV power",
            "th": "กำลังไฟ PV สูงสุดที่แนะนำ"
          },
          "value": "4.5 kW"
        },
        {
          "field": "rated_grid_output_current",
          "label": {
            "en": "Rated grid output current",
            "th": "กระแสขาออกพิกัดฝั่งโครงข่าย"
          },
          "value": "13.6 A / 13 A"
        },
        {
          "field": "mppt_number_and_strings",
          "label": {
            "en": "MPPTs / strings",
            "th": "จำนวน MPPT / สตริง"
          },
          "value": "2 / 2"
        }
      ],
      "notes": [
        {
          "en": "Shares the family photo with the 2.5 kW variant; the image is series-representative.",
          "th": "ใช้ภาพซีรีส์ร่วมกับรุ่น 2.5 กิโลวัตต์ ภาพนี้เป็นภาพตัวแทนของซีรีส์"
        }
      ]
    },
    {
      "id": "s6-eh1p3-6k-l-plus",
      "model": "S6-EH1P3.6K-L-PLUS",
      "familyOnly": false,
      "family": "S6-EH1P(3-8)K-L-PLUS, S6-EH1P10K-L-PLUS(21A)",
      "cat": "single-phase-lv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "1-phase",
          "LV battery"
        ],
        "th": [
          "ไฮบริด",
          "1 เฟส",
          "แบตแรงดันต่ำ"
        ]
      },
      "rated": {
        "en": "3.6 kW AC, single-phase",
        "th": "3.6 กิโลวัตต์ AC, 1 เฟส"
      },
      "desc": {
        "en": "3.6 kW single-phase hybrid inverter for 40–60 V low-voltage battery storage with backup output.",
        "th": "อินเวอร์เตอร์ไฮบริด 1 เฟส 3.6 กิโลวัตต์ ใช้กับแบตเตอรี่แรงดันต่ำ 40-60 โวลต์ พร้อมไฟสำรอง"
      },
      "img": "inverters/official-01.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH1P(3-10)K-L-PLUS series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH1P(3-10)K-L-PLUS เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters19/S6-EH1P(3-10)K-L-PLUS_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-05-26/1748233463610_a390bfc5-8d40-49f4-ae02-6f4487a24016.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "3.6 kW"
        },
        {
          "field": "rated_output_power_backup",
          "label": {
            "en": "Rated output power (backup)",
            "th": "กำลังไฟขาออกพิกัด (ไฟสำรอง)"
          },
          "value": "3.6 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "7.2 kW"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "40 - 60 V"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "96.2%"
        },
        {
          "field": "backup_switch_time",
          "label": {
            "en": "Backup switch time",
            "th": "เวลาสลับไปใช้ไฟสำรอง"
          },
          "value": "< 10 ms"
        }
      ],
      "notes": [
        {
          "en": "Integrated AFCI 2.0 is Optional, not standard.",
          "th": "AFCI 2.0 ในตัวเป็นอุปกรณ์เสริม (Optional) ไม่ใช่ของมาตรฐาน"
        }
      ]
    },
    {
      "id": "s6-eh1p5k-l-plus",
      "model": "S6-EH1P5K-L-PLUS",
      "familyOnly": false,
      "family": "S6-EH1P(3-8)K-L-PLUS, S6-EH1P10K-L-PLUS(21A)",
      "cat": "single-phase-lv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "1-phase",
          "LV battery"
        ],
        "th": [
          "ไฮบริด",
          "1 เฟส",
          "แบตแรงดันต่ำ"
        ]
      },
      "rated": {
        "en": "5 kW AC, single-phase",
        "th": "5 กิโลวัตต์ AC, 1 เฟส"
      },
      "desc": {
        "en": "5 kW single-phase hybrid inverter for low-voltage battery storage with backup output.",
        "th": "อินเวอร์เตอร์ไฮบริด 1 เฟส 5 กิโลวัตต์ ใช้กับแบตเตอรี่แรงดันต่ำ พร้อมไฟสำรอง"
      },
      "img": "inverters/official-01.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH1P(3-10)K-L-PLUS series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH1P(3-10)K-L-PLUS เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters19/S6-EH1P(3-10)K-L-PLUS_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-05-26/1748233463610_a390bfc5-8d40-49f4-ae02-6f4487a24016.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "5 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "10 kW"
        },
        {
          "field": "max_ac_passthrough_current",
          "label": {
            "en": "Max AC pass-through current",
            "th": "กระแส AC ที่ส่งผ่านได้สูงสุด"
          },
          "value": "40 A"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "40 - 60 V"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "96.2%"
        }
      ],
      "notes": []
    },
    {
      "id": "s6-eh1p10k-l-plus-21a",
      "model": "S6-EH1P10K-L-PLUS(21A)",
      "familyOnly": false,
      "family": "S6-EH1P(3-8)K-L-PLUS, S6-EH1P10K-L-PLUS(21A)",
      "cat": "single-phase-lv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "1-phase",
          "LV battery"
        ],
        "th": [
          "ไฮบริด",
          "1 เฟส",
          "แบตแรงดันต่ำ"
        ]
      },
      "rated": {
        "en": "10 kW AC, single-phase",
        "th": "10 กิโลวัตต์ AC, 1 เฟส"
      },
      "desc": {
        "en": "10 kW single-phase hybrid inverter, 21 A per-string PV input, low-voltage battery with backup output.",
        "th": "อินเวอร์เตอร์ไฮบริด 1 เฟส 10 กิโลวัตต์ รับกระแส PV 21 แอมป์ต่อสตริง ใช้กับแบตเตอรี่แรงดันต่ำ"
      },
      "img": "inverters/official-01.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH1P(3-10)K-L-PLUS series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH1P(3-10)K-L-PLUS เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters19/S6-EH1P(3-10)K-L-PLUS_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-05-26/1748233463610_a390bfc5-8d40-49f4-ae02-6f4487a24016.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "10 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "20 kW"
        },
        {
          "field": "max_current_per_dc_input",
          "label": {
            "en": "Max current per DC input",
            "th": "กระแสสูงสุดต่อช่อง DC"
          },
          "value": "21 A"
        },
        {
          "field": "max_ac_passthrough_current",
          "label": {
            "en": "Max AC pass-through current",
            "th": "กระแส AC ที่ส่งผ่านได้สูงสุด"
          },
          "value": "65 A"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "40 - 60 V"
        }
      ],
      "notes": [
        {
          "en": "The '(21A)' suffix is part of the exact model name and refers to the 21 A per-string PV input.",
          "th": "คำต่อท้าย '(21A)' เป็นส่วนหนึ่งของชื่อรุ่น และหมายถึงกระแส PV ขาเข้า 21 แอมป์ต่อสตริง"
        },
        {
          "en": "Cooling and noise levels differ across this series (natural cooling vs intelligent redundant fan cooling), so a single series-wide figure does not apply to this rating.",
          "th": "ระบบระบายความร้อนและระดับเสียงต่างกันภายในซีรีส์ (ระบายความร้อนตามธรรมชาติ เทียบกับพัดลมสำรองอัจฉริยะ) ค่ากลางของซีรีส์จึงใช้แทนรุ่นนี้ไม่ได้"
        }
      ]
    },
    {
      "id": "s6-eh3p12k02-nv-yd-l",
      "model": "S6-EH3P12K02-NV-YD-L",
      "familyOnly": false,
      "family": "S6-EH3P(8-18)K02-NV-YD-L",
      "cat": "three-phase-lv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "3-phase",
          "LV battery"
        ],
        "th": [
          "ไฮบริด",
          "3 เฟส",
          "แบตแรงดันต่ำ"
        ]
      },
      "rated": {
        "en": "12 kW AC, three-phase",
        "th": "12 กิโลวัตต์ AC, 3 เฟส"
      },
      "desc": {
        "en": "12 kW three-phase hybrid inverter for low-voltage battery storage, DC and AC coupling, backup output.",
        "th": "อินเวอร์เตอร์ไฮบริด 3 เฟส 12 กิโลวัตต์ ใช้กับแบตเตอรี่แรงดันต่ำ รองรับการต่อร่วมแบบ DC และ AC"
      },
      "img": "inverters/official-02.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH3P(5-18)K02-NV-YD-L series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH3P(5-18)K02-NV-YD-L เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters22/S6-EH3P(5-18)K_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-05-22/1747902097516_67157a98-da46-425c-9d64-ba7211e0b61c.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "12 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "24 kW"
        },
        {
          "field": "rated_grid_output_current",
          "label": {
            "en": "Rated grid output current",
            "th": "กระแสขาออกพิกัดฝั่งโครงข่าย"
          },
          "value": "18.2 A / 17.3 A"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "97.5%"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "40 - 60 V"
        },
        {
          "field": "dimensions_wxhxd",
          "label": {
            "en": "Dimensions (W×H×D)",
            "th": "ขนาด (กว้าง×สูง×ลึก)"
          },
          "value": "430 × 660 × 305 mm"
        }
      ],
      "notes": [
        {
          "en": "AC-side surge protection is 'AC Type II (Optional)'.",
          "th": "อุปกรณ์ป้องกันไฟกระชากฝั่ง AC เป็นแบบ 'AC Type II (อุปกรณ์เสริม)'"
        }
      ]
    },
    {
      "id": "s6-eh3p18k02-nv-yd-l",
      "model": "S6-EH3P18K02-NV-YD-L",
      "familyOnly": false,
      "family": "S6-EH3P(8-18)K02-NV-YD-L",
      "cat": "three-phase-lv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "3-phase",
          "LV battery"
        ],
        "th": [
          "ไฮบริด",
          "3 เฟส",
          "แบตแรงดันต่ำ"
        ]
      },
      "rated": {
        "en": "18 kW AC, three-phase",
        "th": "18 กิโลวัตต์ AC, 3 เฟส"
      },
      "desc": {
        "en": "18 kW three-phase hybrid inverter for low-voltage battery storage, top of the LV three-phase series.",
        "th": "อินเวอร์เตอร์ไฮบริด 3 เฟส 18 กิโลวัตต์ ใช้กับแบตเตอรี่แรงดันต่ำ รุ่นสูงสุดของซีรีส์"
      },
      "img": "inverters/official-02.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH3P(5-18)K02-NV-YD-L series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH3P(5-18)K02-NV-YD-L เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters22/S6-EH3P(5-18)K_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-05-22/1747902097516_67157a98-da46-425c-9d64-ba7211e0b61c.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "18 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "36 kW"
        },
        {
          "field": "rated_grid_output_current",
          "label": {
            "en": "Rated grid output current",
            "th": "กระแสขาออกพิกัดฝั่งโครงข่าย"
          },
          "value": "27.3 A / 26.1 A"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "97.5%"
        },
        {
          "field": "dimensions_wxhxd",
          "label": {
            "en": "Dimensions (W×H×D)",
            "th": "ขนาด (กว้าง×สูง×ลึก)"
          },
          "value": "430 × 660 × 305 mm"
        }
      ],
      "notes": []
    },
    {
      "id": "s6-eh3p30k-h-21a",
      "model": "S6-EH3P30K-H(21A)",
      "familyOnly": false,
      "family": "S6-EH3P(30-60)K-H(21A)",
      "cat": "three-phase-hv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "3-phase",
          "HV battery"
        ],
        "th": [
          "ไฮบริด",
          "3 เฟส",
          "แบตแรงดันสูง"
        ]
      },
      "rated": {
        "en": "30 kW AC, three-phase",
        "th": "30 กิโลวัตต์ AC, 3 เฟส"
      },
      "desc": {
        "en": "30 kW three-phase high-voltage hybrid inverter for commercial storage, 150–800 V battery.",
        "th": "อินเวอร์เตอร์ไฮบริด 3 เฟส 30 กิโลวัตต์ สำหรับงานเชิงพาณิชย์ แบตเตอรี่ 150-800 โวลต์"
      },
      "img": "inverters/official-03-detail.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH3P(29.9-60)K-H(21A) series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH3P(29.9-60)K-H(21A) เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters44/S6-EH3P(29,9-60)K-H_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-10-31/1761878396820_34fd0417-bb96-494b-8b48-aff1d50f99a8.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "30 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "60 kW"
        },
        {
          "field": "rated_grid_output_current",
          "label": {
            "en": "Rated grid output current",
            "th": "กระแสขาออกพิกัดฝั่งโครงข่าย"
          },
          "value": "45.6 A / 43.3 A"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "150 - 800 V"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "97.7%"
        },
        {
          "field": "dimensions_wxhxd",
          "label": {
            "en": "Dimensions (W×H×D)",
            "th": "ขนาด (กว้าง×สูง×ลึก)"
          },
          "value": "530 × 880 × 290 mm"
        }
      ],
      "notes": [
        {
          "en": "Grid-connection row for this family lists MEA, PEA, DEWA and others — manufacturer datasheet text, not a Thai approval claim.",
          "th": "แถวการเชื่อมต่อโครงข่ายของซีรีส์นี้ระบุ MEA, PEA, DEWA และอื่น ๆ ซึ่งเป็นข้อความในเอกสารของผู้ผลิต ไม่ใช่การอ้างการรับรองของไทย"
        }
      ]
    },
    {
      "id": "s6-eh3p50k-h-21a",
      "model": "S6-EH3P50K-H(21A)",
      "familyOnly": false,
      "family": "S6-EH3P(30-60)K-H(21A)",
      "cat": "three-phase-hv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "3-phase",
          "HV battery"
        ],
        "th": [
          "ไฮบริด",
          "3 เฟส",
          "แบตแรงดันสูง"
        ]
      },
      "rated": {
        "en": "50 kW AC, three-phase",
        "th": "50 กิโลวัตต์ AC, 3 เฟส"
      },
      "desc": {
        "en": "50 kW three-phase high-voltage hybrid inverter for commercial and industrial storage.",
        "th": "อินเวอร์เตอร์ไฮบริด 3 เฟส 50 กิโลวัตต์ สำหรับงานพาณิชย์และอุตสาหกรรม"
      },
      "img": "inverters/official-03-detail.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH3P(29.9-60)K-H(21A) series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH3P(29.9-60)K-H(21A) เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters44/S6-EH3P(29,9-60)K-H_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-10-31/1761878396820_34fd0417-bb96-494b-8b48-aff1d50f99a8.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "50 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "100 kW"
        },
        {
          "field": "rated_grid_output_current",
          "label": {
            "en": "Rated grid output current",
            "th": "กระแสขาออกพิกัดฝั่งโครงข่าย"
          },
          "value": "76 A / 72.2 A"
        },
        {
          "field": "max_ac_input_current_grid_side",
          "label": {
            "en": "Max AC input current (grid side)",
            "th": "กระแส AC ขาเข้าสูงสุด (ฝั่งโครงข่าย)"
          },
          "value": "152 A / 144.4 A"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "150 - 800 V"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "97.7%"
        }
      ],
      "notes": []
    },
    {
      "id": "s6-eh3p100k10-nv-yd-h",
      "model": "S6-EH3P100K10-NV-YD-H",
      "familyOnly": false,
      "family": "S6-EH3P(80-125)K10-NV-YD-H",
      "cat": "three-phase-hv-hybrid",
      "badges": {
        "en": [
          "Hybrid",
          "3-phase",
          "HV battery"
        ],
        "th": [
          "ไฮบริด",
          "3 เฟส",
          "แบตแรงดันสูง"
        ]
      },
      "rated": {
        "en": "100 kW AC, three-phase",
        "th": "100 กิโลวัตต์ AC, 3 เฟส"
      },
      "desc": {
        "en": "100 kW three-phase high-voltage hybrid inverter for large C&I storage, 300–950 V battery.",
        "th": "อินเวอร์เตอร์ไฮบริด 3 เฟส 100 กิโลวัตต์ สำหรับระบบกักเก็บขนาดใหญ่ แบตเตอรี่ 300-950 โวลต์"
      },
      "img": "inverters/official-04-detail.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-EH3P(75-125)K10-NV-YD-H series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-EH3P(75-125)K10-NV-YD-H เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/energy_storage_inverters38/S6-EH3P(75-125)K10-NV-YD-H_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-03-19/1742360507634_ef728fff-bf10-4fa6-b393-2cfc3ce5e5a8.png"
      },
      "flag": {
        "en": "Certification status: planned only. The manufacturer datasheet states that the standards columns show planned certification standards and that timing must be confirmed with the local team. No obtained grid-connection or safety/EMC certification is claimed for this model.",
        "th": "สถานะการรับรอง: เป็นแผนการรับรองเท่านั้น เอกสารของผู้ผลิตระบุว่าคอลัมน์มาตรฐานแสดงเฉพาะมาตรฐานที่วางแผนจะขอรับรอง และต้องยืนยันกำหนดเวลากับทีมงานท้องถิ่น จึงไม่มีการอ้างว่ารุ่นนี้ได้รับการรับรองการเชื่อมต่อโครงข่ายหรือความปลอดภัย/EMC แล้ว"
      },
      "specs": [
        {
          "field": "rated_output_power_grid",
          "label": {
            "en": "Rated output power (grid)",
            "th": "กำลังไฟขาออกพิกัด (ฝั่งโครงข่าย)"
          },
          "value": "100 kW"
        },
        {
          "field": "recommended_max_pv_array_size",
          "label": {
            "en": "Recommended max PV array size",
            "th": "ขนาดแผง PV สูงสุดที่แนะนำ"
          },
          "value": "200 kW"
        },
        {
          "field": "rated_grid_output_current",
          "label": {
            "en": "Rated grid output current",
            "th": "กระแสขาออกพิกัดฝั่งโครงข่าย"
          },
          "value": "151.9 A / 144.3 A"
        },
        {
          "field": "max_power_per_phase",
          "label": {
            "en": "Max power per phase",
            "th": "กำลังไฟสูงสุดต่อเฟส"
          },
          "value": "33.33 kW"
        },
        {
          "field": "eu_efficiency",
          "label": {
            "en": "EU efficiency",
            "th": "ประสิทธิภาพมาตรฐาน EU"
          },
          "value": "97.1%"
        },
        {
          "field": "battery_voltage_range",
          "label": {
            "en": "Battery voltage range",
            "th": "ช่วงแรงดันแบตเตอรี่"
          },
          "value": "300 - 950 V"
        }
      ],
      "notes": [
        {
          "en": "The manufacturer datasheet marks the standards columns as planned certifications — no obtained approval is claimed for this model.",
          "th": "เอกสารของผู้ผลิตระบุคอลัมน์มาตรฐานเป็นการรับรองตามแผน จึงไม่มีการอ้างว่ารุ่นนี้ได้รับการรับรองแล้ว"
        },
        {
          "en": "Specifications shown are the 100 kW column of the manufacturer datasheet.",
          "th": "ข้อมูลจำเพาะที่แสดงมาจากคอลัมน์ 100 กิโลวัตต์ของเอกสารผู้ผลิต"
        }
      ]
    },
    {
      "id": "s6-gc3p150k07-nv-nd",
      "model": "S6-GC3P150K07-NV-ND",
      "familyOnly": false,
      "family": "S6-GC3P150K07-NV-ND (single-model datasheet)",
      "cat": "commercial-utility-grid-tied",
      "badges": {
        "en": [
          "Grid-tied",
          "3-phase",
          "Commercial"
        ],
        "th": [
          "ออนกริด",
          "3 เฟส",
          "เชิงพาณิชย์"
        ]
      },
      "rated": {
        "en": "150 kW AC, three-phase",
        "th": "150 กิโลวัตต์ AC, 3 เฟส"
      },
      "desc": {
        "en": "150 kW three-phase grid-tied inverter for commercial and industrial rooftops, 7 MPPTs.",
        "th": "อินเวอร์เตอร์ออนกริด 3 เฟส 150 กิโลวัตต์ สำหรับงานพาณิชย์และอุตสาหกรรม 7 MPPT"
      },
      "img": "inverters/official-09.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-GC3P(150-200)K07-ND series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-GC3P(150-200)K07-ND เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/solarinverter34/S6-GC3P(150-200)K-ND_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-10-13/1760321643451_66ce9e00-e0f9-40bc-9138-bf7a6cfb21b4.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "rated_output_power",
          "label": {
            "en": "Rated output power",
            "th": "กำลังไฟขาออกพิกัด"
          },
          "value": "150 kW"
        },
        {
          "field": "max_apparent_output_power",
          "label": {
            "en": "Max apparent output power",
            "th": "กำลังไฟปรากฏสูงสุด"
          },
          "value": "165 kVA"
        },
        {
          "field": "max_input_voltage",
          "label": {
            "en": "Max input voltage",
            "th": "แรงดันขาเข้าสูงสุด"
          },
          "value": "1100 V"
        },
        {
          "field": "mppt_number_and_strings",
          "label": {
            "en": "MPPTs / strings",
            "th": "จำนวน MPPT / สตริง"
          },
          "value": "7 / 21"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "98.8%"
        },
        {
          "field": "rated_grid_voltage",
          "label": {
            "en": "Rated grid voltage",
            "th": "แรงดันโครงข่ายพิกัด"
          },
          "value": "3/N/PE, 220 V / 380 V, 230 V / 400 V"
        },
        {
          "field": "weight",
          "label": {
            "en": "Weight",
            "th": "น้ำหนัก"
          },
          "value": "105 kg"
        }
      ],
      "notes": [
        {
          "en": "The '-ND' suffix is part of the exact approved model name and must not be dropped.",
          "th": "คำต่อท้าย '-ND' เป็นส่วนหนึ่งของชื่อรุ่นที่อนุมัติ ห้ามตัดออก"
        },
        {
          "en": "Listed grid-connection standards are G99, IEC61727, EN50549-1/2 and VDE4110 — no Thai MEA/PEA approval is implied.",
          "th": "มาตรฐานการเชื่อมต่อโครงข่ายที่ระบุคือ G99, IEC61727, EN50549-1/2 และ VDE4110 ไม่มีนัยถึงการรับรองของไทย"
        },
        {
          "en": "3-phase unbalanced output, AFCI 2.0 and PID recovery are Optional.",
          "th": "เอาต์พุต 3 เฟสแบบไม่สมดุล, AFCI 2.0 และการกู้คืน PID เป็นอุปกรณ์เสริม"
        }
      ]
    },
    {
      "id": "s6-gu3p350k06-ev-nd",
      "model": "S6-GU3P350K06-EV-ND",
      "familyOnly": false,
      "family": "S6-GU3P350K06-EV-ND (single-model datasheet)",
      "cat": "commercial-utility-grid-tied",
      "badges": {
        "en": [
          "Grid-tied",
          "3-phase",
          "Utility · 800 V AC"
        ],
        "th": [
          "ออนกริด",
          "3 เฟส",
          "ยูทิลิตี้ · AC 800 โวลต์"
        ]
      },
      "rated": {
        "en": "350 kW AC, three-phase, 800 V",
        "th": "350 กิโลวัตต์ AC, 3 เฟส, 800 โวลต์"
      },
      "desc": {
        "en": "350 kW utility-scale grid-tied inverter, 1500 V DC, 800 V AC output for large solar plants.",
        "th": "อินเวอร์เตอร์ออนกริดระดับยูทิลิตี้ 350 กิโลวัตต์ DC 1500 โวลต์ เอาต์พุต AC 800 โวลต์"
      },
      "img": "inverters/official-10-detail.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image of the S6-GU3P(275-350)K06-EV-ND series — representative artwork, not a photo of this specific rating.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis ของซีรีส์ S6-GU3P(275-350)K06-EV-ND เป็นภาพตัวแทน ไม่ใช่ภาพของรุ่นกำลังไฟนี้โดยเฉพาะ"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/solarinverter46/S6-GU3P(275-350)K06-EV-ND_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2025-08-27/1756256555998_48453f07-52da-4ea8-ad5b-06112809a139.png"
      },
      "flag": {
        "en": "800 V AC design note: rated grid voltage is 3/PE, 800 V (range 640–920 V). This model requires a dedicated 800 V AC / step-up transformer design and is NOT a drop-in replacement for an ordinary 400 V factory board.",
        "th": "ข้อควรทราบด้านการออกแบบ AC 800 โวลต์: แรงดันโครงข่ายพิกัดคือ 3/PE, 800 โวลต์ (ช่วง 640-920 โวลต์) รุ่นนี้ต้องออกแบบระบบ AC 800 โวลต์ / หม้อแปลงเพิ่มแรงดันโดยเฉพาะ และไม่สามารถใช้แทนตู้ไฟโรงงานแบบ 400 โวลต์ทั่วไปได้ทันที"
      },
      "specs": [
        {
          "field": "rated_output_power",
          "label": {
            "en": "Rated output power",
            "th": "กำลังไฟขาออกพิกัด"
          },
          "value": "350 kW"
        },
        {
          "field": "rated_grid_voltage",
          "label": {
            "en": "Rated grid voltage",
            "th": "แรงดันโครงข่ายพิกัด"
          },
          "value": "3/PE, 800 V"
        },
        {
          "field": "grid_voltage_range",
          "label": {
            "en": "Grid voltage range",
            "th": "ช่วงแรงดันโครงข่าย"
          },
          "value": "640 - 920 V"
        },
        {
          "field": "max_input_voltage",
          "label": {
            "en": "Max input voltage",
            "th": "แรงดันขาเข้าสูงสุด"
          },
          "value": "1500 V"
        },
        {
          "field": "mppt_number_and_strings",
          "label": {
            "en": "MPPTs / strings",
            "th": "จำนวน MPPT / สตริง"
          },
          "value": "6 / 30"
        },
        {
          "field": "max_efficiency",
          "label": {
            "en": "Max efficiency",
            "th": "ประสิทธิภาพสูงสุด"
          },
          "value": "99.0%"
        },
        {
          "field": "weight",
          "label": {
            "en": "Weight",
            "th": "น้ำหนัก"
          },
          "value": "117 kg"
        }
      ],
      "notes": [
        {
          "en": "Listed grid-connection standards do not include Thai MEA/PEA; no Thai approval is claimed.",
          "th": "มาตรฐานการเชื่อมต่อโครงข่ายที่ระบุไม่รวม กฟน./กฟภ. ของไทย จึงไม่มีการอ้างการรับรองของไทย"
        },
        {
          "en": "DC connection is a 'Matching connector', not standard MC4.",
          "th": "จุดต่อ DC เป็น 'ขั้วต่อที่จับคู่เฉพาะ' (Matching connector) ไม่ใช่ MC4 มาตรฐาน"
        }
      ]
    },
    {
      "id": "soliscloud",
      "model": "SolisCloud",
      "familyOnly": false,
      "family": null,
      "cat": "monitoring-connectivity",
      "badges": {
        "en": [
          "Monitoring platform",
          "Not an inverter"
        ],
        "th": [
          "แพลตฟอร์มติดตามระบบ",
          "ไม่ใช่อินเวอร์เตอร์"
        ]
      },
      "rated": {
        "en": "Manufacturer-operated monitoring platform",
        "th": "แพลตฟอร์มติดตามระบบที่ผู้ผลิตเป็นผู้ให้บริการ"
      },
      "desc": {
        "en": "SolisCloud monitoring platform: remote monitoring, alarms and remote control of Solis PV and storage systems via app and web.",
        "th": "แพลตฟอร์ม SolisCloud สำหรับติดตามระบบ แจ้งเตือน และควบคุมระยะไกลผ่านแอปและเว็บ"
      },
      "img": "inverters/official-07.png",
      "imgLabeling": "platform",
      "caption": {
        "en": "Official Solis platform image of SolisCloud (manufacturer screenshot, not hardware).",
        "th": "ภาพทางการจากเว็บไซต์ Solis ของแพลตฟอร์ม SolisCloud (ภาพหน้าจอของผู้ผลิต ไม่ใช่ฮาร์ดแวร์)"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/accessories6/SolisCloud.html",
        "imageUrl": "https://cmsdata.solisinverters.com/uploads/image/20210630/huGXxVN8is9t1Ewk5GmXJEZTnPQDf34O0IfvAm37.png"
      },
      "flag": {
        "en": "SolisCloud is operated by the manufacturer and shown here for reference only. Solvio provides no live data feed, connected dashboard or API integration.",
        "th": "SolisCloud ดำเนินการโดยผู้ผลิต และแสดงไว้เพื่อเป็นข้อมูลอ้างอิงเท่านั้น Solvio ไม่ได้ให้บริการข้อมูลแบบเรียลไทม์ แดชบอร์ดที่เชื่อมต่อ หรือการเชื่อมต่อ API"
      },
      "specs": [
        {
          "field": "capability_remote_control",
          "label": {
            "en": "Remote control",
            "th": "การควบคุมระยะไกล"
          },
          "value": "Remote firmware update, remote troubleshooting, remote shut off"
        },
        {
          "field": "capability_battery_and_tou",
          "label": {
            "en": "Battery & time-of-use",
            "th": "แบตเตอรี่และการใช้ตามช่วงเวลา"
          },
          "value": "Battery reserve control, time-of-use (TOU) charge/discharge, export power control"
        },
        {
          "field": "capability_site_management",
          "label": {
            "en": "Site management",
            "th": "การจัดการไซต์งาน"
          },
          "value": "Multi-site management across residential, commercial and utility plants with per-team access permissions"
        },
        {
          "field": "capability_monitoring",
          "label": {
            "en": "Monitoring",
            "th": "การติดตามระบบ"
          },
          "value": "String-level monitoring, intelligent alarms with resolution recommendations, remote I-V curve scanning"
        },
        {
          "field": "access_channels",
          "label": {
            "en": "Access channels",
            "th": "ช่องทางการเข้าใช้งาน"
          },
          "value": "SolisCloud mobile application and website"
        },
        {
          "field": "hardware_scope",
          "label": {
            "en": "Hardware scope",
            "th": "ขอบเขตฮาร์ดแวร์"
          },
          "value": "Data stick, data box, EPM and PLC hardware transmit to the SolisCloud platform"
        }
      ],
      "notes": [
        {
          "en": "The platform is operated by the manufacturer; Solvio operates no part of it.",
          "th": "แพลตฟอร์มดำเนินการโดยผู้ผลิต Solvio ไม่ได้ดูแลส่วนใดของระบบ"
        }
      ]
    },
    {
      "id": "s5-wifi-st-usb",
      "model": "S5-WiFi-ST-USB",
      "familyOnly": false,
      "family": "S5-WiFi-ST",
      "cat": "monitoring-connectivity",
      "badges": {
        "en": [
          "Data logger",
          "Wi-Fi",
          "USB variant"
        ],
        "th": [
          "ดาต้าล็อกเกอร์",
          "Wi-Fi",
          "รุ่นพอร์ต USB"
        ]
      },
      "rated": {
        "en": "Dual-band Wi-Fi logger, up to 10 inverters",
        "th": "ล็อกเกอร์ Wi-Fi สองย่านความถี่ รองรับอินเวอร์เตอร์ได้ถึง 10 เครื่อง"
      },
      "desc": {
        "en": "Dual-band Wi-Fi data logger, USB-port variant; connects up to 10 Solis inverters to SolisCloud.",
        "th": "ดาต้าล็อกเกอร์ Wi-Fi สองย่านความถี่ รุ่นพอร์ต USB เชื่อมต่ออินเวอร์เตอร์ Solis ได้ถึง 10 เครื่องเข้ากับ SolisCloud"
      },
      "img": "inverters/official-06.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image showing the 4Pin and USB alternatives of the S5-WiFi-ST logger. The variant selected here is unchanged: S5-WiFi-ST-USB — the 4Pin unit shown is the other alternative and is not a USB device.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis แสดงทางเลือกแบบ 4Pin และแบบ USB ของล็อกเกอร์ S5-WiFi-ST รุ่นที่เลือกไว้ยังคงเป็น S5-WiFi-ST-USB ส่วนตัวที่เป็นแบบ 4Pin ในภาพเป็นอีกทางเลือกหนึ่งและไม่ใช่อุปกรณ์ USB"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/accessories15/S5-WiFi-ST_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2024-08-13/2024-08-13-153055_1723534255773.png"
      },
      "flag": null,
      "specs": [
        {
          "field": "communication_interface",
          "label": {
            "en": "Communication interface",
            "th": "อินเทอร์เฟซการสื่อสาร"
          },
          "value": "External USB Port"
        },
        {
          "field": "wireless_communication",
          "label": {
            "en": "Wireless communication",
            "th": "การสื่อสารไร้สาย"
          },
          "value": "802.11a/b/g/n, 2.412-2.484 GHz / 5.150-5.350 GHz / 5.725-5.850 GHz"
        },
        {
          "field": "number_of_connected_inverters",
          "label": {
            "en": "Connected inverters",
            "th": "จำนวนอินเวอร์เตอร์ที่เชื่อมต่อได้"
          },
          "value": "≤ 10 (inverters must first be hand-in-hand connected by RS485)"
        },
        {
          "field": "data_collection_interval",
          "label": {
            "en": "Data collection interval",
            "th": "ความถี่ในการเก็บข้อมูล"
          },
          "value": "5 minutes"
        },
        {
          "field": "dimensions_lxwxh",
          "label": {
            "en": "Dimensions (L×W×H)",
            "th": "ขนาด (ยาว×กว้าง×สูง)"
          },
          "value": "113 × 50 × 34 mm"
        },
        {
          "field": "ingress_protection",
          "label": {
            "en": "Ingress protection",
            "th": "ระดับการป้องกัน (IP)"
          },
          "value": "IP65"
        }
      ],
      "notes": [
        {
          "en": "Connector (4-Pin vs USB) must be qualified against the specific host inverter's communication port; not universally compatible.",
          "th": "ต้องตรวจสอบชนิดขั้วต่อ (4-Pin หรือ USB) ให้ตรงกับพอร์ตสื่อสารของอินเวอร์เตอร์ที่จะติดตั้ง ไม่ได้ใช้ร่วมกันได้ทุกรุ่น"
        },
        {
          "en": "Listed certification is CE and FCC only; Thai NBTC certification is not claimed.",
          "th": "การรับรองที่ระบุมีเพียง CE และ FCC ไม่ได้อ้างการรับรองจาก กสทช. ของไทย"
        }
      ]
    },
    {
      "id": "s1-w4g-st",
      "model": "S1-W4G-ST",
      "familyOnly": true,
      "family": "S1-W4G-ST",
      "cat": "monitoring-connectivity",
      "badges": {
        "en": [
          "Data logger",
          "Wi-Fi + 4G",
          "Family — connector not selected"
        ],
        "th": [
          "ดาต้าล็อกเกอร์",
          "Wi-Fi + 4G",
          "เป็นซีรีส์ — ยังไม่เลือกขั้วต่อ"
        ]
      },
      "rated": {
        "en": "Wi-Fi + 4G logger family, up to 10 inverters",
        "th": "ซีรีส์ล็อกเกอร์ Wi-Fi + 4G รองรับอินเวอร์เตอร์ได้ถึง 10 เครื่อง"
      },
      "desc": {
        "en": "Wi-Fi plus 4G cellular data logger family; connects up to 10 Solis inverters to SolisCloud where no fixed internet is available.",
        "th": "ดาต้าล็อกเกอร์ Wi-Fi และ 4G เชื่อมต่ออินเวอร์เตอร์ Solis ได้ถึง 10 เครื่องเข้ากับ SolisCloud สำหรับพื้นที่ไม่มีอินเทอร์เน็ต"
      },
      "img": "inverters/official-05.png",
      "imgLabeling": "family",
      "caption": {
        "en": "Official Solis family image showing the 4 Pin and USB alternatives of the S1-W4G-ST logger. No single connector variant is selected, so this image represents the family only.",
        "th": "ภาพครอบครัวผลิตภัณฑ์ทางการจากเว็บไซต์ Solis แสดงทางเลือกแบบ 4 Pin และแบบ USB ของล็อกเกอร์ S1-W4G-ST ยังไม่มีการเลือกชนิดขั้วต่อ ภาพนี้จึงเป็นภาพตัวแทนของซีรีส์เท่านั้น"
      },
      "source": {
        "officialPage": "https://www.solisinverters.com/global/accessories11/S1-W4G-ST_gl.html",
        "imageUrl": "https://cmsdata.solisinverters.com/upload/2024-04-28/2024-04-28-091545_1714266945868.png"
      },
      "flag": {
        "en": "S1-W4G-ST is a FAMILY, not a stocked part number. The datasheet lists S1-W4G-ST (4 Pin) with an external 4-Pin port and S1-W4G-ST (USB) with an external USB port. No connector-specific part number, dimension or weight is stated until the variant is qualified against the host inverter.",
        "th": "S1-W4G-ST เป็นชื่อซีรีส์ ไม่ใช่รหัสสินค้าที่มีสต็อก เอกสารระบุรุ่น S1-W4G-ST (4 Pin) ที่มีพอร์ต 4-Pin ภายนอก และรุ่น S1-W4G-ST (USB) ที่มีพอร์ต USB ภายนอก จะยังไม่ระบุรหัสสินค้า ขนาด หรือน้ำหนักเฉพาะรุ่น จนกว่าจะเลือกขั้วต่อให้ตรงกับอินเวอร์เตอร์ที่จะติดตั้ง"
      },
      "specs": [
        {
          "field": "wireless_communication",
          "label": {
            "en": "Wireless communication",
            "th": "การสื่อสารไร้สาย"
          },
          "value": "Wi-Fi 802.11b/g/n, 2.412-2.484 GHz (5 GHz not supported); cellular 4G/3G/2G LTE-FDD/TDD, UMTS, GSM"
        },
        {
          "field": "number_of_connected_inverters",
          "label": {
            "en": "Connected inverters",
            "th": "จำนวนอินเวอร์เตอร์ที่เชื่อมต่อได้"
          },
          "value": "≤ 10 (inverters must first be hand-in-hand connected by RS485)"
        },
        {
          "field": "data_collection_interval",
          "label": {
            "en": "Data collection interval",
            "th": "ความถี่ในการเก็บข้อมูล"
          },
          "value": "5 minutes"
        },
        {
          "field": "ingress_protection",
          "label": {
            "en": "Ingress protection",
            "th": "ระดับการป้องกัน (IP)"
          },
          "value": "IP65"
        }
      ],
      "notes": [
        {
          "en": "4G service requires a SIM/data plan; none is supplied or implied by Solvio.",
          "th": "บริการ 4G ต้องใช้ซิม/แพ็กเกจข้อมูล ซึ่ง Solvio ไม่ได้จัดหาให้และไม่ได้สื่อว่ารวมอยู่ด้วย"
        },
        {
          "en": "Listed certification is CE and FCC only; Thai NBTC certification is not claimed.",
          "th": "การรับรองที่ระบุมีเพียง CE และ FCC ไม่ได้อ้างการรับรองจาก กสทช. ของไทย"
        }
      ]
    }
  ];
