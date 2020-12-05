const questions = {
  title: "What technologies do you use?",
  pages: [
    {
      name: "Page 1",
      questions: [
        {
          name: "frameworkUsing",
          title: "Do you use any front-end framework?",
          type: "radiogroup",
          choices: ["Yes", "No"],
          isRequired: true,
        },
        {
          name: "framework",
          title: "What front-end framework do you use?",
          type: "checkbox",
          choices: ["React", "Vue", "Angular", "jQuery"],
          hasOther: true,
          isRequired: true,
          visibleIf: "{frameworkUsing} = 'Yes'",
        },
      ],
    },
    {
      name: "Page 2",
      questions: [
        {
          type: "comment",
          name: "about",
          title: "Please tell us about your experience",
        },
      ],
    },
  ],
};

export default questions;
