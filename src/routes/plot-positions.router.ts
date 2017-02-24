import { Router } from "express";

import PlotPositionService from "./../services/plot-position.service";

export class PlotPositionRouter {

    router: Router;
    private plotPositionService: PlotPositionService;

    /**
     * Initialize the router
     */
    constructor( _plotPositionService?: PlotPositionService ) {

        this.plotPositionService = _plotPositionService || new PlotPositionService();

        this.router = Router();
        this.init();

    }

    init() {
        /**
         * @apiDefine PlotPositionRequest
         *
         * @apiParam (Request Parameters) {number} [id] Database id of the plot position
         * @apiParam (Request Parameters) {boolean} [get_deleted=false] Get plot positions even if they're deleted
         */

        /**
         * @apiDefine PlotPositionPost
         *
         * @apiParam (Post Body) {number} r Radial position value. Unit: mm. Represents the distance from the center of the position to the center of the DemeBot center pivot.
         * @apiParam (Post Body) {number} t Theta angle value. Unit: degrees. Respresents the angular distance from the DemeBot's most rclockwise reach to the position the DemeBot's arms must be to reach the posistion.
         * @apiParam (Post Body) {number} z Z position value. Unit: mm. Represents the vertical distance of the position.
         */

        /**
         * @apiDefine PlotPositionResponse
         *
         * @apiSuccess (Successful Response) {plot_position[]} plot_positions An array of plot positions. Each element in the array has the following keys:
         * @apiSuccess (Successful Response) {number} plot_position.r Radial position value. Unit: mm. Represents the distance from the center of the position to the center of the DemeBot center pivot.
         * @apiSuccess (Successful Response) {number} plot_position.t Theta angle value. Unit: degrees. Respresents the angular distance from the DemeBot's most rclockwise reach to the position the DemeBot's arms must be to reach the posistion.
         * @apiSuccess (Successful Response) {number} plot_position.z Z position value. Unit: mm. Represents the vertical distance of the position.
         * @apiSuccess (Successful Response) {Date} plot_position.ended_at Deleted at time
         * @apiSuccess (Successful Response) {Date} plot_position.created_at Created at time
         */

        /**
         * @api {get} /api/positions Get plot positions
         * @apiName Get plot position
         * @apiGroup PlotPosition
         *
         * @apiUse PlotPositionRequest
         * @apiUse PlotPositionResponse
         */
        this.router.get( "/", this.plotPositionService.get );

        /**
         * @api {post} /api/positions Add a new plot position
         * @apiName Add a new plot position
         * @apiGroup PlotPosition
         *
         * @apiUse PlotPositionRequest
         * @apiUse PlotPositionResponse
         */
        this.router.post( "/", this.plotPositionService.post );

        /**
         * @api {delete} /api/positions Delete a plot position by id
         * @apiName Delete a plot position
         * @apiGroup PlotPosition
         *
         * @apiParam (Request Parameters) {number} id Database id of the tool
         */
        this.router.delete( "/", this.plotPositionService.delete );
    }
}

// Create router and export its Express.Router

export default PlotPositionRouter;