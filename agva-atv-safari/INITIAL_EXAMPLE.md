# INITIAL_EXAMPLE.md - Example Feature Request

## Feature Title
Responsive Image Gallery with Lightbox

## Description
Create a responsive image gallery component that displays images in a grid layout and opens a lightbox when an image is clicked. The gallery should adapt to different screen sizes and maintain proper aspect ratios for images.

## Requirements
- Display images in a responsive grid (2 columns on mobile, 3 on tablet, 4 on desktop)
- Maintain image aspect ratios
- Implement lightbox functionality on image click
- Lightbox should support navigation between images
- Include close button and keyboard navigation support
- Optimize images for web (appropriate sizes and formats)

## Technical Considerations
- Use CSS Grid or Flexbox for layout
- Implement lazy loading for images
- Ensure accessibility (ARIA labels, keyboard navigation)
- Use modern JavaScript (ES6+) without external libraries
- Optimize for performance

## User Stories
1. As a user, I want to see a grid of images that adapts to my screen size so I can view the gallery on any device.
2. As a user, I want to click on an image to view it in a larger lightbox so I can see the details.
3. As a user, I want to navigate between images in the lightbox without closing it so I can view all images easily.

## Acceptance Criteria
- Gallery displays correctly on mobile, tablet, and desktop
- Images maintain aspect ratios without distortion
- Lightbox opens when an image is clicked
- Lightbox navigation works correctly
- Keyboard navigation is supported
- Page loads quickly with lazy loading implemented

## Additional Notes
- Use placeholder images from https://picsum.photos/ for the example
- Consider using CSS transitions for smooth animations
- Test on various devices and browsers