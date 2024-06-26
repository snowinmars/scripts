type Exception = {
  readonly solution: string;
  readonly allowedMatches: {
    readonly atProjects: string[];
    readonly from: string;
    readonly to: string[];
  }[];
}

export const exceptions: Exception[] = [{
  "solution": "KLOWD.sln",
  "allowedMatches":  [{
    "from": "Debug",
    "to": ["ServerAllInOneDebug", "LocalAllInOneDebug"],
    "atProjects": [
      "043AFA76-9ED0-4ED4-B319-FF36E8BC298E",
      "043AFA76-9ED0-4ED4-B319-FF36E8BC298E",
      "0BB4A121-A50C-452C-84F0-44E7800EB210",
      "0BB4A121-A50C-452C-84F0-44E7800EB210",
      "0BE20333-1C2A-4EDE-88DE-927249DD59E7",
      "0BE20333-1C2A-4EDE-88DE-927249DD59E7",
      "3718E472-B6FD-4796-9A14-406EC66A11E7",
      "3718E472-B6FD-4796-9A14-406EC66A11E7",
      "6A045FAE-2731-4D44-BD0D-265CA6A5E2E3",
      "6A045FAE-2731-4D44-BD0D-265CA6A5E2E3",
      "87EEC290-61A0-410C-8979-18FF61AC6BE7",
      "87EEC290-61A0-410C-8979-18FF61AC6BE7",
      "C667CF0D-94F6-4F85-80DA-3D6AC8DD053B",
      "C667CF0D-94F6-4F85-80DA-3D6AC8DD053B",
      "907AA5D3-0B28-42A1-B783-52F608D62E52",
      "BA5D9B14-E430-400C-870D-18356E3DB1AC",
      "066C5267-3626-42EB-A432-02BF95CD770A",
      "066C5267-3626-42EB-A432-02BF95CD770A",
      "0BCFE928-7639-4D46-BF9A-552BAF295235",
      "0BCFE928-7639-4D46-BF9A-552BAF295235",
      "0ECDD17E-602C-4A40-9CEA-5E470FF46501",
      "0ECDD17E-602C-4A40-9CEA-5E470FF46501",
      "149110DB-BFEE-4A5C-B2D0-AAB519C53D7F",
      "149110DB-BFEE-4A5C-B2D0-AAB519C53D7F",
      "21ED3747-4FAF-4CC1-B15C-5190B519A79D",
      "21ED3747-4FAF-4CC1-B15C-5190B519A79D",
      "27CDD957-54B7-4511-BA5A-66EC2CE8942E",
      "27CDD957-54B7-4511-BA5A-66EC2CE8942E",
      "3320D34F-2BA5-43F9-BA39-2A30705F10EC",
      "3320D34F-2BA5-43F9-BA39-2A30705F10EC",
      "3B091075-342F-4180-B9A6-456A6BC880E3",
      "3B091075-342F-4180-B9A6-456A6BC880E3",
      "3E628D59-7B41-4EDC-B709-D29A41B16A33",
      "3E628D59-7B41-4EDC-B709-D29A41B16A33",
      "417C9B17-C008-476B-87F0-BAAF2CC95EC5",
      "417C9B17-C008-476B-87F0-BAAF2CC95EC5",
      "4559316F-5497-4DC9-AE9F-A5F9EF775030",
      "4559316F-5497-4DC9-AE9F-A5F9EF775030",
      "4672192C-FEC2-45FE-8D7E-9A12200DAA3B",
      "4672192C-FEC2-45FE-8D7E-9A12200DAA3B",
      "4A7A7FE4-37A5-48EB-8E4A-7226D17BAA7E",
      "4A7A7FE4-37A5-48EB-8E4A-7226D17BAA7E",
      "52D3F9AA-C52B-46BF-A59D-2E7B4CAC0B19",
      "52D3F9AA-C52B-46BF-A59D-2E7B4CAC0B19",
      "5AFAF89D-C602-4BAC-B700-8055D8F0F178",
      "5AFAF89D-C602-4BAC-B700-8055D8F0F178",
      "610175CD-A0E6-43C8-8D4E-B114B8524BA9",
      "610175CD-A0E6-43C8-8D4E-B114B8524BA9",
      "64396FE4-BFA9-48EA-ACE8-1FD73BE37750",
      "64396FE4-BFA9-48EA-ACE8-1FD73BE37750",
      "7F59ACEA-8048-42B7-9FF5-4994C23AF6C0",
      "7F59ACEA-8048-42B7-9FF5-4994C23AF6C0",
      "84FE8282-2831-4356-A3AC-35C67FA9B09C",
      "84FE8282-2831-4356-A3AC-35C67FA9B09C",
      "89535A20-96CE-4FE2-BE91-759A5D1C3442",
      "89535A20-96CE-4FE2-BE91-759A5D1C3442",
      "89C15C14-3C1D-4727-830A-56A22F26BCB2",
      "89C15C14-3C1D-4727-830A-56A22F26BCB2",
      "90EE2EFF-ED42-4A5D-971A-DD09E2D8EFBE",
      "90EE2EFF-ED42-4A5D-971A-DD09E2D8EFBE",
      "9AAC664A-8592-4D24-AA90-C3073323BA86",
      "9AAC664A-8592-4D24-AA90-C3073323BA86",
      "AEE374B0-29C1-4878-9385-7519D433CE5F",
      "AEE374B0-29C1-4878-9385-7519D433CE5F",
      "B127224E-A1C9-4DB2-B786-6C375C881122",
      "B127224E-A1C9-4DB2-B786-6C375C881122",
      "B40030D4-8B02-43B8-BB72-9B4A65EE25FF",
      "B40030D4-8B02-43B8-BB72-9B4A65EE25FF",
      "B7C30D97-3EDF-4854-A38C-41EB5C89A7BD",
      "B7C30D97-3EDF-4854-A38C-41EB5C89A7BD",
      "C1264549-811D-4A9C-96C9-43D6603FC20C",
      "C1264549-811D-4A9C-96C9-43D6603FC20C",
      "C3600033-14F5-4CA5-8439-AC67CD730E69",
      "C3600033-14F5-4CA5-8439-AC67CD730E69",
      "D38E53F9-DB6D-4E0A-8573-F4CFD5D82FAD",
      "D38E53F9-DB6D-4E0A-8573-F4CFD5D82FAD",
      "D936413D-27D1-4D23-8C5E-FE3DE6B54E9A",
      "D936413D-27D1-4D23-8C5E-FE3DE6B54E9A",
      "E155B281-14A0-4C1E-AF0D-699CEF5467A8",
      "E155B281-14A0-4C1E-AF0D-699CEF5467A8",
      "E3CC8929-75F6-4C5A-A09B-F8E06233E6A5",
      "E3CC8929-75F6-4C5A-A09B-F8E06233E6A5",
      "E7A59A63-4A3C-4833-81D5-9B217DCA0036",
      "E7A59A63-4A3C-4833-81D5-9B217DCA0036",
      "EB0A7F6D-4F52-4964-9DBF-52127519239B",
      "EB0A7F6D-4F52-4964-9DBF-52127519239B",
      "F6482173-6BDA-41B6-8F03-6F4193051D45",
      "F6482173-6BDA-41B6-8F03-6F4193051D45",
      "1F7E0874-0662-4EE0-9E04-4AA2B482A18F"
    ]
  }, {
    "from": "Debug-Optimus",
    "to": ["ServerAllInOneDebug", "LocalAllInOneDebug"],
    "atProjects": [
      "043AFA76-9ED0-4ED4-B319-FF36E8BC298E",
      "043AFA76-9ED0-4ED4-B319-FF36E8BC298E",
      "0BB4A121-A50C-452C-84F0-44E7800EB210",
      "0BB4A121-A50C-452C-84F0-44E7800EB210",
      "0BE20333-1C2A-4EDE-88DE-927249DD59E7",
      "0BE20333-1C2A-4EDE-88DE-927249DD59E7",
      "3718E472-B6FD-4796-9A14-406EC66A11E7",
      "3718E472-B6FD-4796-9A14-406EC66A11E7",
      "6A045FAE-2731-4D44-BD0D-265CA6A5E2E3",
      "6A045FAE-2731-4D44-BD0D-265CA6A5E2E3",
      "87EEC290-61A0-410C-8979-18FF61AC6BE7",
      "87EEC290-61A0-410C-8979-18FF61AC6BE7",
      "C667CF0D-94F6-4F85-80DA-3D6AC8DD053B",
      "C667CF0D-94F6-4F85-80DA-3D6AC8DD053B",
      "907AA5D3-0B28-42A1-B783-52F608D62E52",
      "BA5D9B14-E430-400C-870D-18356E3DB1AC",
      "066C5267-3626-42EB-A432-02BF95CD770A",
      "066C5267-3626-42EB-A432-02BF95CD770A",
      "0BCFE928-7639-4D46-BF9A-552BAF295235",
      "0BCFE928-7639-4D46-BF9A-552BAF295235",
      "0ECDD17E-602C-4A40-9CEA-5E470FF46501",
      "0ECDD17E-602C-4A40-9CEA-5E470FF46501",
      "149110DB-BFEE-4A5C-B2D0-AAB519C53D7F",
      "149110DB-BFEE-4A5C-B2D0-AAB519C53D7F",
      "21ED3747-4FAF-4CC1-B15C-5190B519A79D",
      "21ED3747-4FAF-4CC1-B15C-5190B519A79D",
      "27CDD957-54B7-4511-BA5A-66EC2CE8942E",
      "27CDD957-54B7-4511-BA5A-66EC2CE8942E",
      "3320D34F-2BA5-43F9-BA39-2A30705F10EC",
      "3320D34F-2BA5-43F9-BA39-2A30705F10EC",
      "3B091075-342F-4180-B9A6-456A6BC880E3",
      "3B091075-342F-4180-B9A6-456A6BC880E3",
      "3E628D59-7B41-4EDC-B709-D29A41B16A33",
      "3E628D59-7B41-4EDC-B709-D29A41B16A33",
      "417C9B17-C008-476B-87F0-BAAF2CC95EC5",
      "417C9B17-C008-476B-87F0-BAAF2CC95EC5",
      "4559316F-5497-4DC9-AE9F-A5F9EF775030",
      "4559316F-5497-4DC9-AE9F-A5F9EF775030",
      "4672192C-FEC2-45FE-8D7E-9A12200DAA3B",
      "4672192C-FEC2-45FE-8D7E-9A12200DAA3B",
      "4A7A7FE4-37A5-48EB-8E4A-7226D17BAA7E",
      "4A7A7FE4-37A5-48EB-8E4A-7226D17BAA7E",
      "52D3F9AA-C52B-46BF-A59D-2E7B4CAC0B19",
      "52D3F9AA-C52B-46BF-A59D-2E7B4CAC0B19",
      "5AFAF89D-C602-4BAC-B700-8055D8F0F178",
      "5AFAF89D-C602-4BAC-B700-8055D8F0F178",
      "610175CD-A0E6-43C8-8D4E-B114B8524BA9",
      "610175CD-A0E6-43C8-8D4E-B114B8524BA9",
      "64396FE4-BFA9-48EA-ACE8-1FD73BE37750",
      "64396FE4-BFA9-48EA-ACE8-1FD73BE37750",
      "7F59ACEA-8048-42B7-9FF5-4994C23AF6C0",
      "7F59ACEA-8048-42B7-9FF5-4994C23AF6C0",
      "84FE8282-2831-4356-A3AC-35C67FA9B09C",
      "84FE8282-2831-4356-A3AC-35C67FA9B09C",
      "89535A20-96CE-4FE2-BE91-759A5D1C3442",
      "89535A20-96CE-4FE2-BE91-759A5D1C3442",
      "89C15C14-3C1D-4727-830A-56A22F26BCB2",
      "89C15C14-3C1D-4727-830A-56A22F26BCB2",
      "90EE2EFF-ED42-4A5D-971A-DD09E2D8EFBE",
      "90EE2EFF-ED42-4A5D-971A-DD09E2D8EFBE",
      "9AAC664A-8592-4D24-AA90-C3073323BA86",
      "9AAC664A-8592-4D24-AA90-C3073323BA86",
      "AEE374B0-29C1-4878-9385-7519D433CE5F",
      "AEE374B0-29C1-4878-9385-7519D433CE5F",
      "B127224E-A1C9-4DB2-B786-6C375C881122",
      "B127224E-A1C9-4DB2-B786-6C375C881122",
      "B40030D4-8B02-43B8-BB72-9B4A65EE25FF",
      "B40030D4-8B02-43B8-BB72-9B4A65EE25FF",
      "B7C30D97-3EDF-4854-A38C-41EB5C89A7BD",
      "B7C30D97-3EDF-4854-A38C-41EB5C89A7BD",
      "C1264549-811D-4A9C-96C9-43D6603FC20C",
      "C1264549-811D-4A9C-96C9-43D6603FC20C",
      "C3600033-14F5-4CA5-8439-AC67CD730E69",
      "C3600033-14F5-4CA5-8439-AC67CD730E69",
      "D38E53F9-DB6D-4E0A-8573-F4CFD5D82FAD",
      "D38E53F9-DB6D-4E0A-8573-F4CFD5D82FAD",
      "D936413D-27D1-4D23-8C5E-FE3DE6B54E9A",
      "D936413D-27D1-4D23-8C5E-FE3DE6B54E9A",
      "E155B281-14A0-4C1E-AF0D-699CEF5467A8",
      "E155B281-14A0-4C1E-AF0D-699CEF5467A8",
      "E3CC8929-75F6-4C5A-A09B-F8E06233E6A5",
      "E3CC8929-75F6-4C5A-A09B-F8E06233E6A5",
      "E7A59A63-4A3C-4833-81D5-9B217DCA0036",
      "E7A59A63-4A3C-4833-81D5-9B217DCA0036",
      "EB0A7F6D-4F52-4964-9DBF-52127519239B",
      "EB0A7F6D-4F52-4964-9DBF-52127519239B",
      "F6482173-6BDA-41B6-8F03-6F4193051D45",
      "F6482173-6BDA-41B6-8F03-6F4193051D45",
      "1F7E0874-0662-4EE0-9E04-4AA2B482A18F"
    ]
  }, {
    "from": "Release",
    "to": ["ServerAllInOneRelease", "LocalAllInOneRelease"],
    "atProjects": [
      "043AFA76-9ED0-4ED4-B319-FF36E8BC298E",
      "043AFA76-9ED0-4ED4-B319-FF36E8BC298E",
      "0BB4A121-A50C-452C-84F0-44E7800EB210",
      "0BB4A121-A50C-452C-84F0-44E7800EB210",
      "0BE20333-1C2A-4EDE-88DE-927249DD59E7",
      "0BE20333-1C2A-4EDE-88DE-927249DD59E7",
      "3718E472-B6FD-4796-9A14-406EC66A11E7",
      "3718E472-B6FD-4796-9A14-406EC66A11E7",
      "6A045FAE-2731-4D44-BD0D-265CA6A5E2E3",
      "6A045FAE-2731-4D44-BD0D-265CA6A5E2E3",
      "87EEC290-61A0-410C-8979-18FF61AC6BE7",
      "87EEC290-61A0-410C-8979-18FF61AC6BE7",
      "C667CF0D-94F6-4F85-80DA-3D6AC8DD053B",
      "C667CF0D-94F6-4F85-80DA-3D6AC8DD053B",
      "907AA5D3-0B28-42A1-B783-52F608D62E52",
      "BA5D9B14-E430-400C-870D-18356E3DB1AC",
      "066C5267-3626-42EB-A432-02BF95CD770A",
      "066C5267-3626-42EB-A432-02BF95CD770A",
      "0BCFE928-7639-4D46-BF9A-552BAF295235",
      "0BCFE928-7639-4D46-BF9A-552BAF295235",
      "0ECDD17E-602C-4A40-9CEA-5E470FF46501",
      "0ECDD17E-602C-4A40-9CEA-5E470FF46501",
      "149110DB-BFEE-4A5C-B2D0-AAB519C53D7F",
      "149110DB-BFEE-4A5C-B2D0-AAB519C53D7F",
      "21ED3747-4FAF-4CC1-B15C-5190B519A79D",
      "21ED3747-4FAF-4CC1-B15C-5190B519A79D",
      "27CDD957-54B7-4511-BA5A-66EC2CE8942E",
      "27CDD957-54B7-4511-BA5A-66EC2CE8942E",
      "3320D34F-2BA5-43F9-BA39-2A30705F10EC",
      "3320D34F-2BA5-43F9-BA39-2A30705F10EC",
      "3B091075-342F-4180-B9A6-456A6BC880E3",
      "3B091075-342F-4180-B9A6-456A6BC880E3",
      "3E628D59-7B41-4EDC-B709-D29A41B16A33",
      "3E628D59-7B41-4EDC-B709-D29A41B16A33",
      "417C9B17-C008-476B-87F0-BAAF2CC95EC5",
      "417C9B17-C008-476B-87F0-BAAF2CC95EC5",
      "4559316F-5497-4DC9-AE9F-A5F9EF775030",
      "4559316F-5497-4DC9-AE9F-A5F9EF775030",
      "4672192C-FEC2-45FE-8D7E-9A12200DAA3B",
      "4672192C-FEC2-45FE-8D7E-9A12200DAA3B",
      "4A7A7FE4-37A5-48EB-8E4A-7226D17BAA7E",
      "4A7A7FE4-37A5-48EB-8E4A-7226D17BAA7E",
      "52D3F9AA-C52B-46BF-A59D-2E7B4CAC0B19",
      "52D3F9AA-C52B-46BF-A59D-2E7B4CAC0B19",
      "5AFAF89D-C602-4BAC-B700-8055D8F0F178",
      "5AFAF89D-C602-4BAC-B700-8055D8F0F178",
      "610175CD-A0E6-43C8-8D4E-B114B8524BA9",
      "610175CD-A0E6-43C8-8D4E-B114B8524BA9",
      "64396FE4-BFA9-48EA-ACE8-1FD73BE37750",
      "64396FE4-BFA9-48EA-ACE8-1FD73BE37750",
      "7F59ACEA-8048-42B7-9FF5-4994C23AF6C0",
      "7F59ACEA-8048-42B7-9FF5-4994C23AF6C0",
      "84FE8282-2831-4356-A3AC-35C67FA9B09C",
      "84FE8282-2831-4356-A3AC-35C67FA9B09C",
      "89535A20-96CE-4FE2-BE91-759A5D1C3442",
      "89535A20-96CE-4FE2-BE91-759A5D1C3442",
      "89C15C14-3C1D-4727-830A-56A22F26BCB2",
      "89C15C14-3C1D-4727-830A-56A22F26BCB2",
      "90EE2EFF-ED42-4A5D-971A-DD09E2D8EFBE",
      "90EE2EFF-ED42-4A5D-971A-DD09E2D8EFBE",
      "9AAC664A-8592-4D24-AA90-C3073323BA86",
      "9AAC664A-8592-4D24-AA90-C3073323BA86",
      "AEE374B0-29C1-4878-9385-7519D433CE5F",
      "AEE374B0-29C1-4878-9385-7519D433CE5F",
      "B127224E-A1C9-4DB2-B786-6C375C881122",
      "B127224E-A1C9-4DB2-B786-6C375C881122",
      "B40030D4-8B02-43B8-BB72-9B4A65EE25FF",
      "B40030D4-8B02-43B8-BB72-9B4A65EE25FF",
      "B7C30D97-3EDF-4854-A38C-41EB5C89A7BD",
      "B7C30D97-3EDF-4854-A38C-41EB5C89A7BD",
      "C1264549-811D-4A9C-96C9-43D6603FC20C",
      "C1264549-811D-4A9C-96C9-43D6603FC20C",
      "C3600033-14F5-4CA5-8439-AC67CD730E69",
      "C3600033-14F5-4CA5-8439-AC67CD730E69",
      "D38E53F9-DB6D-4E0A-8573-F4CFD5D82FAD",
      "D38E53F9-DB6D-4E0A-8573-F4CFD5D82FAD",
      "D936413D-27D1-4D23-8C5E-FE3DE6B54E9A",
      "D936413D-27D1-4D23-8C5E-FE3DE6B54E9A",
      "E155B281-14A0-4C1E-AF0D-699CEF5467A8",
      "E155B281-14A0-4C1E-AF0D-699CEF5467A8",
      "E3CC8929-75F6-4C5A-A09B-F8E06233E6A5",
      "E3CC8929-75F6-4C5A-A09B-F8E06233E6A5",
      "E7A59A63-4A3C-4833-81D5-9B217DCA0036",
      "E7A59A63-4A3C-4833-81D5-9B217DCA0036",
      "EB0A7F6D-4F52-4964-9DBF-52127519239B",
      "EB0A7F6D-4F52-4964-9DBF-52127519239B",
      "F6482173-6BDA-41B6-8F03-6F4193051D45",
      "F6482173-6BDA-41B6-8F03-6F4193051D45",
      "1F7E0874-0662-4EE0-9E04-4AA2B482A18F"
    ]
  }]
}, {
  "solution": "Kloud.Records.Optimus.sln",
  "allowedMatches":  [{
    "from": "Debug",
    "to": ["ServerAllInOneDebug", "LocalAllInOneDebug"],
    "atProjects": [
      "907AA5D3-0B28-42A1-B783-52F608D62E52",
      "BA5D9B14-E430-400C-870D-18356E3DB1AC",
      "04D866DC-ADB4-4BC8-9281-1120E6807C4B",
      "05382FED-A6F3-4518-B692-EBA695EF9706",
      "09457A0F-4420-41BF-9D1B-1AC6C9E9442C",
      "100B1A28-803F-4EE7-AFCD-CC240231F896",
      "110C776F-C2E6-4829-B743-92849E275A11",
      "1AE7ECDC-41DF-4702-8F5D-181FCBDE7CB0",
      "1F87DA4C-B1DE-4180-8C5A-DA510BF63F1E",
      "2F8B05AA-4BC9-4B69-9101-95ADAD77F9F3",
      "302235CD-2290-4F06-B9C5-57887686691B",
      "32586DC6-99A2-4333-9C88-371258643E46",
      "351AB350-C1F0-4F3C-A2DB-7B9B748A21D0",
      "4120F82A-3E2B-4B69-BAF2-F3DDF5207F37",
      "49FA1B1C-9D6D-4F63-A42D-46FA5557F90C",
      "50DE43A3-7532-4065-A170-572D9476C122",
      "586F1E2E-42C6-4100-9B9A-D4C175E1481B",
      "5A71578E-D340-4DAF-9A33-40F0518378DD",
      "6D55DD69-4313-4D50-8D6C-3A86C69DD088",
      "AAAC3A36-A1FC-42AA-AEAD-79F8089136C5",
      "B950EEF7-6258-4768-BCD8-E0DA9B7B11FC",
      "B9A32667-A4D3-4F0E-99E2-35548D69B512",
      "BF91E2DC-49BC-4C39-856E-4595AE1B29BF",
      "C5375847-7ABC-4E20-A44E-405349418936",
      "CB2C49BD-0F53-4366-A68C-7E4ADA6B783A",
      "D9455A5C-DAE0-48E7-916A-1255A167BC8E",
      "E578502A-81DF-40F4-B938-FF929A01F155",
      "4F961CCA-E615-40A1-B1E3-1A07ADDF1392",
      "5C9DCFF2-5426-49B5-933C-CDF126E9D72F",
	  "C3FCD82D-EA0F-42B7-B682-F46B5D0E3E8D"
    ]
  }, {
    "from": "Release",
    "to": ["ServerAllInOneRelease", "LocalAllInOneRelease"],
    "atProjects": [
      "04D866DC-ADB4-4BC8-9281-1120E6807C4B",
      "BA5D9B14-E430-400C-870D-18356E3DB1AC",
      "05382FED-A6F3-4518-B692-EBA695EF9706",
      "09457A0F-4420-41BF-9D1B-1AC6C9E9442C",
      "100B1A28-803F-4EE7-AFCD-CC240231F896",
      "110C776F-C2E6-4829-B743-92849E275A11",
      "1AE7ECDC-41DF-4702-8F5D-181FCBDE7CB0",
      "1F87DA4C-B1DE-4180-8C5A-DA510BF63F1E",
      "2F8B05AA-4BC9-4B69-9101-95ADAD77F9F3",
      "302235CD-2290-4F06-B9C5-57887686691B",
      "32586DC6-99A2-4333-9C88-371258643E46",
      "351AB350-C1F0-4F3C-A2DB-7B9B748A21D0",
      "4120F82A-3E2B-4B69-BAF2-F3DDF5207F37",
      "49FA1B1C-9D6D-4F63-A42D-46FA5557F90C",
      "50DE43A3-7532-4065-A170-572D9476C122",
      "586F1E2E-42C6-4100-9B9A-D4C175E1481B",
      "5A71578E-D340-4DAF-9A33-40F0518378DD",
      "6D55DD69-4313-4D50-8D6C-3A86C69DD088",
      "AAAC3A36-A1FC-42AA-AEAD-79F8089136C5",
      "B950EEF7-6258-4768-BCD8-E0DA9B7B11FC",
      "B9A32667-A4D3-4F0E-99E2-35548D69B512",
      "BF91E2DC-49BC-4C39-856E-4595AE1B29BF",
      "C5375847-7ABC-4E20-A44E-405349418936",
      "CB2C49BD-0F53-4366-A68C-7E4ADA6B783A",
      "D9455A5C-DAE0-48E7-916A-1255A167BC8E",
      "E578502A-81DF-40F4-B938-FF929A01F155",
      "4F961CCA-E615-40A1-B1E3-1A07ADDF1392",
      "5C9DCFF2-5426-49B5-933C-CDF126E9D72F"
    ]
  }]
}, {
  "solution": "Kloud.Account.sln",
  "allowedMatches":  [{
    "from": "ServerAllInOneDebug",
    "to": ["Debug"],
    "atProjects": ["EC7CC636-9EED-4E7A-A6F4-9CA96930876C"],
  }, {
    "from": "LocalAllInOneDebug",
    "to": ["Debug"],
    "atProjects": ["EC7CC636-9EED-4E7A-A6F4-9CA96930876C"],
  }, {
    "atProjects": ["EC7CC636-9EED-4E7A-A6F4-9CA96930876C"],
    "from": "ServerAllInOneRelease",
    "to": ["Release"],
  }, {
    "from": "LocalAllInOneRelease",
    "to": ["Release"],
    "atProjects": ["EC7CC636-9EED-4E7A-A6F4-9CA96930876C"],
  }]
}];
