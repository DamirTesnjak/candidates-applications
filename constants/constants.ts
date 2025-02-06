export const STORE_REDUCER_NAME = {
    hrUser: "hrUser",
    candidate: 'candidate'
}

export const DATABASES = {
    candidates: 'candidates',
    hrUsers: 'hrUsers',
    emailTemplates: 'emailTemplates',
    companyEmailConfigs: 'companyEmailConfigs',
    mappedEmailTemplates: 'mappedEmailTemplates',
}

export const EMAIL_TYPE = {
    verify: "VERIFY",
    reset: "RESET",
}

export const FILE_TYPE = {
    image: "image",
    file: "file",
}

export const FORM_INPUT_FIELD_NAME = {
    file: "file",
    image: "profilePicture",
    companyLogo: "companyLogo",
}

export const EDIT_TEXT_BUTTON = {
    paragraph: { type: "paragraph", startTag: "<p>", endTag: "</p>", setCursorBackBy: 4 },
    italic: { type: "italic", startTag: "<i>", endTag: "</i>", setCursorBackBy: 4 },
    strong: { type: "strong", startTag: "<strong>", endTag: "</strong>", setCursorBackBy: 9 },
    underline: { type: "underline", startTag: "<u>", endTag: "</u>", setCursorBackBy: 4 },
    newline: { type: "newline", startTag: "<br>", endTag: "", setCursorBackBy: 0 },
    link: { type: "link", startTag: '<a href="">', endTag: "</a>", setCursorBackBy: 4 },
    superscript: { type: "superscript", startTag: "<sup>", endTag: "</sup>", setCursorBackBy: 6 },
    subscript: { type: "subscript", startTag: "<sub>", endTag: "</sub>", setCursorBackBy: 6 },
    targetPersonFullName: { type: "targetPersonFullName", startTag: "[TARGET_PERSON_FULL_NAME]", endTag: "" },
    hrUserFullNameTemplate: { type: "hrUserFullNameTemplate", startTag: "[HR_USER_FULL_NAME]", endTag: "" },
    jobTitleTemplate: { type: "jobTitleTemplate", startTag: "[JOB_TITLE]", endTag: "" },
    companyNameTemplate: { type: "companyNameTemplate", startTag: "[COMPANY_NAME]", endTag: "" },
    currentYearTemplate: { type: "currentYearTemplate", startTag: "[CURRENT_YEAR]", endTag: "" },
    startDateTemplate: { type: "startDateTemplate", startTag: "[JOB_START_DATE]", endTag: "" },
}

export const PAGES = {
    customersPage: "customerPage",
    emailTemplatePage: "emailTemplatePage",
}