import RentAgreementImage from "../../assets/serviceIcons/rentAgreement.svg";
import receiptImage from "../../assets/serviceIcons/receipt.svg";
import calculator from "../../assets/serviceIcons/EMI-calculator.svg";

const serviceContent = () => {
        return (
                {
                        "EMI Calculator": {
                                "points": ["Calculate Your Monthly EMIs",
                                        "Find Out the Total Amount",
                                        "Customized EMIs"],
                                "iconFile": calculator,
                                "iconBackgroundColor": "#FFF0D8",
                                "path": "/services/emi-calculator",
                                "buttonName": "Calculate"
                        },
                        "Rent Agreement": {
                                "points": ["Super Quick & Easy",
                                        "Stamped & E-Signed",
                                        "Delivered Directly in Mailbox"],
                                "iconFile": RentAgreementImage,
                                "iconBackgroundColor": "rgba(72, 145, 211, 0.11)",
                                "path": "/services/rent-agreement",
                                "buttonName": "Create"
                        },
                        "Online Rent Receipt Generator": {
                                "points": ["Instant Download and Print",
                                        "Customizable for Monthly/Quarterly",
                                        "Accurate Calculations"],
                                "iconFile": receiptImage,
                                "iconBackgroundColor": "#F3EFEA",
                                "path": "/services/rent-slip-generator",
                                "buttonName": "Generate"
                        },
                        // "Interiors & Furnishing": {
                        //         "points": ["Lowest Prices Guaranteed",
                        //                 "10-Year Warranty",
                        //                 "Timely Delivery Assurance"],
                        //         "iconFile": interiorImage,
                        //         "iconBackgroundColor": "#FFF0EF",
                        //         "buttonName": "Upcoming"
                        // },
                        // "Home Loan": {
                        //         "points": ["Super Quick & Easy",
                        //                 "Stamped & E-Signed",
                        //                 "Delivered Directly in Mailbox"],
                        //         "iconFile": HomeLoanImage,
                        //         "iconBackgroundColor": "#EFE7DC",
                        //         "buttonName": "Upcoming"
                        // },
                        // "Legal & Registration": {
                        //         "points": ["End to end legal assistance in property related matters.",
                        //         ],
                        //         "iconFile": legalImage,
                        //         "iconBackgroundColor": "#FFF0D8",
                        //         "buttonName": "Upcoming"
                        // },

                }
        );
}
export default serviceContent;