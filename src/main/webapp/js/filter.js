var filterControls = [
  new nyc.Check({
    target: '#age-filter',
    title: 'Age group',
    expanded: true,
    choices: [{
      name: 'AGE_0-5',
      value: '1',
      label: 'Under 5 yrs old',
      checked: false
    }, {
      name: 'AGE_5-24',
      value: '1',
      label: '5 to 24 yrs old',
      checked: false
    }, {
      name: 'AGE_25-60',
      value: '1',
      label: '25 to 60 yrs old',
      checked: false
    }, {
      name: 'AGE_60+',
      value: '1',
      label: '60 yrs old and older',
      checked: false
    }]
  }),
  new nyc.Check({
    target: '#type-filter',
    title: 'Service category',
    expanded: true,
    choices: [{
      name: 'INTIMATE_PARTNER_VIOLENCE',
      value: '1',
      label: 'Intimate partner violence',
      checked: false
    }, {
      name: 'FAMILY_VIOLENCE',
      value: '1',
      label: 'Family violence',
      checked: false
    }, {
      name: 'SEXUAL_ASSAULT',
      value: '1',
      label: 'Sexual assult',
      checked: false
    }, {
      name: 'VIOLENT_CRIME',
      value: '1',
      label: 'Violent crime',
      checked: false
    }, {
      name: 'PROPERTY/FINANCIAL_CRIMES',
      value: '1',
      label: 'Property/financial crime',
      checked: false
    }]
  })
];