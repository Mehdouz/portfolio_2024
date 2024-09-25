const plugin = require('tailwindcss/plugin')
const { projects } = require('./data/data.ts')

module.exports = plugin(function({ addUtilities }) {
  const newUtilities = {}

  Object.entries(projects).forEach(([projectName, projectData]) => {
    ['desktop', 'mobile'].forEach(type => {
      projectData.images[type].forEach((image, index) => {
        const className = `.h-${projectName}-${type}-${index + 1}`
        console.log('Generating class:', className);
        newUtilities[className] = {
          height: image.containerHeight.sm + 'px',
          '@screen md': {
            height: image.containerHeight.md + 'px',
          },
          '@screen lg': {
            height: image.containerHeight.lg + 'px',
          },
          '@screen xl': {
            height: image.containerHeight.xl + 'px',
          },
          '@screen 2xl': {
            height: image.containerHeight.xxl + 'px',
          },
        }
      })
    })
  })

  // Add the test class here
  newUtilities['.h-test-class'] = { height: '100px' }

  addUtilities(newUtilities)
})
