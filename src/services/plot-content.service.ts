import { Request, Response, NextFunction } from "express";

const debug = require("debug");

import PlotContentController from "./../controllers/plot-content.controller";
import PlotContentInterface from "./../models/plot-content.interface";

// Middleware for getting and setting plot content data
export class PlotContentService {

    private plotContentController: PlotContentController;

    constructor( _plotContentController?: PlotContentController ) {
        this.plotContentController = ( _plotContentController || new PlotContentController() );
    }

    // get plot contents
    public get = ( request: Request, response: Response ) => {


        // find desired elements in request parameters
        let get_deleted: boolean = request.query.get_deleted;
        let id: number = request.query.id;
        let name: string = request.query.name;

        // query the controller function
        this.plotContentController
        .get( id, get_deleted )
        .then( ( _plot_content: PlotContentInterface[] ) => {
            if ( _plot_content.length < 1 ) response.status( 404 ).send();
            else {
                response.status( 200 ).send( { plot_content : _plot_content } );
            }
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );
    }

    public post = ( request: Request, response: Response ) => {
        let planted_at = request.body.planted_at;
        let PLANT_TYPES_id = request.body.PLANT_TYPES_id;
        let PLOT_POSITIONS_id = request.body.PLOT_POSITIONS_id;

        return this.plotContentController
        .post(
            planted_at,
            PLANT_TYPES_id,
            PLOT_POSITIONS_id
        )
        .then( ( _new: PlotContentInterface ) => {
            console.log( JSON.stringify( _new ) );
            response.status( 201 ).send( _new );
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );

    }

    public delete = ( parameter: Request, response: Response ) => {
        let id = parameter.body.id;

        return this.plotContentController
        .delete( id )
        .then( ( _deleted: PlotContentInterface[] ) => {
            console.log( "deleted content id: " + id + " length: " + _deleted.length );
            console.log( JSON.stringify( _deleted ) );
            if ( _deleted.length >= 1 ) response.status( 202 ).send( _deleted[0] );
            else response.status( 404 ).send();
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send();
        } );
    }

    public put = ( request: Request, response: Response, next: NextFunction ) => {
        console.log(request.params);
        //response.send(request.params);
        let id: number = request.params.id;
        let planted_at = request.body.planted_at;
        let PLANT_TYPES_id = request.body.PLANT_TYPES_id;
        let PLOT_POSITIONS_id = request.body.PLOT_POSITIONS_id;

        this.plotContentController
        .put(
            id,
            planted_at,
            PLANT_TYPES_id,
            PLOT_POSITIONS_id
        )
        .then( ( plots: PlotContentInterface ) => {
            response.status( 200 ).send( { plots : plots } );
            
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );
    }

}

export default PlotContentService;