import { Router } from "express";

import PlotContentService from "./../services/plot-content.service";

export class PlotContentRouter {

    router: Router;
    private plotContentService: PlotContentService;

    /**
     * Initialize the router
     */
    constructor( _plotContentService?: PlotContentService ) {

        this.plotContentService = _plotContentService || new PlotContentService();

        this.router = Router();
        this.init();

    }

    init() {
        /**
         * @apiDefine PlotContentRequest
         *
         * @apiParam (Request Parameters) {number} [id] Database id of the plot content
         * @apiParam (Request Parameters) {Date} [planted_at] Date the plot content was planted 
         * @apiParam (Request Parameters) {number} [PLANT_TYPES_id] Plant type ID of the plot content
         * @apiParam (Request Parameters) {number} [PLOT_POSITIONS_id] Plot position ID of the plot content
         * @apiParam (Request Parameters) {boolean} [get_deleted=false] Get plot contents even if they're deleted
         */

        /**
         * @apiDefine PlotContentPost
         *
         * @apiParam (Post Body) {Date} planted_at Date the plot content was planted 
         * @apiParam (Post Body) {number} PLANT_TYPES_id Plant type ID of the plot content
         * @apiParam (Post Body) {number} PLOT_POSITIONS_id Plot position ID of the plot content
         */

        /**
         * @apiDefine PlotContentResponse
         *
         * @apiSuccess (Successful Response) {plot_content[]} plot_contents An array of plot contents. Each element in the array has the following keys:
         * @apiSuccess (Successful Response) {Date} plot_content.planted_at Date the plant was planted 
         * @apiSuccess (Successful Response) {number} plot_content.PLANT_TYPES_id Plant type ID of the plant
         * @apiSuccess (Successful Response) {number} plot_content.PLOT_POSITIONS_id Plot position ID of the plant
         * @apiSuccess (Successful Response) {number} plot_content.r Plot Radial position value. Unit: mm. Represents the distance from the center of the plant to the center of the DemeBot center pivot.
         * @apiSuccess (Successful Response) {number} plot_content.t Theta angle value. Unit: degrees. Respresents the angular distance from the DemeBot's most clockwise reach to the position the DemeBot's arms must be to reach the plant.
         * @apiSuccess (Successful Response) {number} plot_content.z Z position value. Unit: mm. Represents the vertical distance of the plant's base.
         * @apiSuccess (Successful Response) {Date} plot_content.ended_at Deleted at time
         * @apiSuccess (Successful Response) {Date} plot_content.created_at Created at time
         */

        /**
         * @api {get} /api/contents Get plot contents
         * @apiName Get plot contents
         * @apiGroup PlotContent
         *
         * @apiUse PlotContentRequest
         * @apiUse PlotContentResponse
         */
        this.router.get( "/", this.plotContentService.get );

        /**
         * @api {post} /api/contents Add a new plot content
         * @apiName Add a new plot content
         * @apiGroup PlotContent
         *
         * @apiUse PlotContentRequest
         * @apiUse PlotContentResponse
         */
        this.router.post( "/", this.plotContentService.post );

        /**
         * @api {delete} /api/contents Delete a plot content by id
         * @apiName Delete a  plot content
         * @apiGroup PlotContent
         *
         * @apiParam (Request Parameters) {number} id Database id of the plot content
         */
        this.router.delete( "/", this.plotContentService.delete );
    }
}

// Create router and export its Express.Router

export default PlotContentRouter;