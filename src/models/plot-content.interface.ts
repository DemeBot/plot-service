interface PlotContentInterface {

    // DB assigned ID. Should only be generated by DB, therefore is readonly.
    readonly id?: string;

    // Date the plant was planted.
    planted_at: Date;

    // Plant type ID of the plant
    PLANT_TYPES_id: number;

    // Plot posistion ID of the plant
    PLOT_POSITIONS_id: number;

    // Radial position value. Unit: mm. Represents the distance from the center of the plant to the center of the DemeBot center pivot.
    r?: number;

    // Theta angle value. Unit: degrees. Represents the angular distance from the DemeBot's most clockwise reach to the position the DemeBot's arms must be to reach the plant.
    t?: number;

    // Z position value. Unit: mm. Represents the vertical distance of the plant's base.
    z?: number;

    // Date the data entry was marked as ended. Kept for accounting purposes.
    ended_at?: Date;

    // Date the data entry was created. Kept for accounting purposes.
    created_at?: Date;

}

export default PlotContentInterface;