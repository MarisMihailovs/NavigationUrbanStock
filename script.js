const companyData = [
    {
        companyId: "#signtech",
        companyName: "Signtech",
        companyLogo: "/logos/Signtech_BW.png",
        companyPhone: 29123456,
        companyEmail: "sales@signtech.com",
        companyHours: "9:00-17:00",
        pathId: "path1",  // Corresponding path for Signtech
        rectId: "rect1"   // Corresponding rectangle for Signtech
    },
    {
        companyId: "#nordic-sauna",
        companyName: "Nordic Sauna",
        companyLogo: "/logos/NS.png",
        companyPhone: 29111222,
        companyEmail: "info@test.com",
        companyHours: "10:00-18:00",
        pathId: "path2",  // Corresponding path for Nordic Sauna
        rectId: "rect2"   // Corresponding rectangle for Nordic Sauna
    },
    {
        companyId: "#eleport",
        companyName: "Eleport",
        companyLogo: "/logos/eleport.png",
        companyPhone: 29111333,
        companyEmail: "info@eletest.lv",
        companyHours: "10:00-18:00",
        pathId: "path3",  // Corresponding path for Nordic Sauna
        rectId: "rect3"   // Corresponding rectangle for Nordic Sauna
    }
];

// Function to update the company data
function updateCompanyInfo(company) {
    // Fade out the current data
    d3.select(".companyData")
        .transition()
        .duration(500) // Half a second for fading out
        .style("opacity", 0)
        .on("end", function () {
            // Update the content after fade out completes
            d3.select("#companyName").text(company.companyName);
            d3.select("#companyLogo").attr("src", company.companyLogo);
            d3.select("#companyPhone").text(company.companyPhone);
            d3.select("#companyEmail").text(company.companyEmail);
            d3.select("#companyHours").text(company.companyHours);

            // Fade in the new content
            d3.select(".companyData")
                .transition()
                .duration(500) // Half a second for fading in
                .style("opacity", 1);
        });
}

// Function to reset the company data section
function resetCompanyInfo() {
    d3.select(".companyData")
        .style("opacity", 0);  // Immediately reset opacity to 0 without animation
}

// Function to reset paths, rectangles, and company data
function resetAll() {
    companyData.forEach(company => {
        // Reset div styles
        d3.select(company.companyId)
            .classed("active", false); // Remove the active class

        // Reset the paths
        d3.select(`#${company.pathId}`)
            .interrupt()  // Stop any ongoing transition
            .attr("stroke-dashoffset", function () {
                return this.getTotalLength();  // Reset the path to hidden state
            })
            .style("opacity", 0)  // Hide the path
            .attr("marker-end", null);  // Remove the arrow marker

        // Reset the rectangles
        d3.select(`#${company.rectId}`)
            .interrupt()  // Stop any ongoing transition
            .style("opacity", 0)  // Hide the rectangle
            .classed("animate", false);  // Remove pulsating effect
    });

    // Reset the company info section
    resetCompanyInfo();
}

// Set up event listeners and animate on click
companyData.forEach(company => {
    d3.select(company.companyId).on("click", function () {
        // First reset all other animations and styles
        resetAll();

        // Set the clicked div as active by adding the active class
        d3.select(company.companyId).classed("active", true);

        // Animate the path by drawing it
        d3.select(`#${company.pathId}`)
            .attr("stroke-dasharray", function () {
                return this.getTotalLength();  // Get path length
            })
            .attr("stroke-dashoffset", function () {
                return this.getTotalLength();  // Hide the path
            })
            .style("opacity", 1)  // Make the path visible
            .transition()
            .duration(3000)
            .attr("stroke-dashoffset", 0)  // Draw the path
            .on("end", function () {
                // Add the arrow marker once the path is fully drawn
                d3.select(`#${company.pathId}`)
                    .attr("marker-end", "url(#arrow)");

                // Animate the rectangle after the arrow appears
                d3.select(`#${company.rectId}`)
                    .transition()
                    .duration(1500)
                    .style("opacity", 0.7)  // Set the opacity to 0.7
                    .on("end", function () {
                        // Apply pulsating effect after it fades in
                        d3.select(this).classed("animate", true);
                    });
            });

        // Update the company info section with data from the clicked company
        updateCompanyInfo(company);
    });
});